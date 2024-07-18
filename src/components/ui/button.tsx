'use client'

import Link from 'next/link'
import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-signal-400 text-base-950 hover:bg-signal-300 shadow-[0_0_0_0_var(--glow-signal)] hover:shadow-[0_0_28px_0_var(--glow-signal)]',
  secondary:
    'border border-[var(--hairline-strong)] bg-base-850/60 text-ink-100 backdrop-blur-sm hover:border-signal-400/60 hover:bg-base-800',
  ghost: 'text-ink-300 hover:text-ink-100 hover:bg-base-850',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.9375rem]',
}

/**
 * Gives the element a small magnetic pull toward the cursor.
 *
 * The listeners are attached in an effect rather than passed as React props,
 * so nothing reads the ref during render. Mouse pointers only, and skipped
 * entirely when the visitor prefers reduced motion.
 */
function useMagnetic<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled || prefersReducedMotion) return

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      element.style.transform = `translate3d(${x * 0.16}px, ${y * 0.22}px, 0)`
    }

    const reset = () => {
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('blur', reset)

    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('blur', reset)
      reset()
    }
  }, [enabled, prefersReducedMotion])

  return ref
}

interface CommonProps {
  variant?: Variant
  size?: Size
  magnetic?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(magnetic)

  return (
    <button {...props} ref={ref} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </button>
  )
}

type ButtonLinkProps = CommonProps & {
  href: string
  external?: boolean
} & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'>

export function ButtonLink({
  href,
  external,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic)
  const classes = cn(base, variants[variant], sizes[size], className)
  const isExternal = external ?? /^https?:\/\//.test(href)

  if (isExternal) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <Link {...props} href={href} ref={ref} className={classes}>
      {children}
    </Link>
  )
}
