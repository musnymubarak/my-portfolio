import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Scroll reveals.
 *
 * These are server components. The animation is CSS, driven by a single
 * IntersectionObserver mounted once in the layout, which flips
 * `data-revealed` on each element as it enters the viewport.
 *
 * Two properties fall out of that, both deliberate:
 *   - the markup is identical on the server and the client, so there is no
 *     hydration mismatch when the visitor prefers reduced motion;
 *   - the hidden starting state lives behind a `.js` class, so with
 *     JavaScript unavailable the content simply renders.
 */

type Element = 'div' | 'li' | 'article' | 'section' | 'ul' | 'ol'

interface RevealProps {
  children: ReactNode
  /** Seconds, matching the previous motion API. */
  delay?: number
  className?: string
  as?: Element
  /** Travel distance in pixels. */
  y?: number
}

export function Reveal({ children, delay = 0, className, as = 'div', y }: RevealProps) {
  const Component = as
  // CSS custom properties are not part of the CSSProperties index signature.
  const style = {
    ...(delay ? { '--reveal-delay': `${Math.round(delay * 1000)}ms` } : {}),
    ...(y !== undefined ? { '--reveal-y': `${y}px` } : {}),
  } as React.CSSProperties

  return (
    <Component data-reveal className={cn('reveal', className)} style={style}>
      {children}
    </Component>
  )
}

/**
 * Staggers direct children. The children are RevealItem elements, each of
 * which receives its own delay from its index.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: Element
}) {
  const Component = as
  return <Component className={className}>{children}</Component>
}

export function RevealItem({
  children,
  className,
  as = 'div',
  index = 0,
  stagger = 0.07,
}: {
  children: ReactNode
  className?: string
  as?: Element
  index?: number
  stagger?: number
}) {
  return (
    <Reveal as={as} className={className} delay={index * stagger}>
      {children}
    </Reveal>
  )
}

/**
 * Reveals a headline word by word. The words are real text nodes rather than
 * a duplicated screen-reader copy, so assistive technology and crawlers read
 * the heading normally.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Component = 'h1',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}) {
  const words = text.split(' ')

  return (
    <Component data-reveal className={cn('word-reveal', className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="word-mask">
            <span
              style={
                {
                  '--word-delay': `${Math.round((delay + index * 0.055) * 1000)}ms`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Component>
  )
}
