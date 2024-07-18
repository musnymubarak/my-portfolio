import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Small pill used for technologies, tags and categories. */
export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'signal' | 'muted'
  className?: string
}) {
  const tones = {
    neutral: 'border-[var(--hairline-strong)] bg-base-850 text-ink-300',
    signal: 'border-signal-400/30 bg-signal-400/10 text-signal-200',
    muted: 'border-transparent bg-base-800 text-ink-400',
  } as const

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Section heading with an eyebrow rule and an optional trailing link. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = 'h2',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  action?: { label: string; href: string }
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={cn('flex flex-col gap-5 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <Heading className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.12] font-semibold">
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="group inline-flex min-h-6 shrink-0 items-center gap-1.5 py-1 text-sm font-medium text-ink-300 transition-colors hover:text-signal-300"
        >
          {action.label}
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  )
}

/** Consistent vertical rhythm for every page section. */
export function Section({
  children,
  className,
  id,
  ariaLabelledBy,
}: {
  children: ReactNode
  className?: string
  id?: string
  ariaLabelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-20 sm:py-24 lg:py-28', className)}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

/** Hairline divider that fades at both ends. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{
        background:
          'linear-gradient(90deg, transparent, var(--hairline-strong) 18%, var(--hairline-strong) 82%, transparent)',
      }}
    />
  )
}

/** Key/value row used by the résumé and project architecture tables. */
export function DataRow({ term, detail }: { term: string; detail: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-[var(--hairline)] py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
      <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-500">{term}</dt>
      <dd className="text-[0.9375rem] leading-relaxed text-ink-300">{detail}</dd>
    </div>
  )
}
