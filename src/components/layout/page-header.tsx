import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { ClusterBackdrop } from '@/components/three/cluster-backdrop'
import { Reveal, WordReveal } from '@/components/motion/reveal'

/**
 * Shared masthead for every inner page. Carrying the same eyebrow, headline
 * treatment and cluster backdrop across routes is what makes the site read as
 * one product rather than eight separate pages.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  backdrop = true,
}: {
  eyebrow: string
  title: string
  description?: ReactNode
  breadcrumb?: { label: string; href: string }[]
  children?: ReactNode
  backdrop?: boolean
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--hairline)]">
      {backdrop ? (
        <>
          <ClusterBackdrop
            desktopOnly
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-base-950/50 to-base-950"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="shell py-16 sm:py-20 lg:py-24">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronRight className="size-3 text-ink-600" aria-hidden="true" />
                  ) : null}
                  {index === breadcrumb.length - 1 ? (
                    <span className="text-ink-300">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-ink-200">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="eyebrow">{eyebrow}</p>

        <WordReveal
          as="h1"
          text={title}
          delay={0.05}
          className="mt-5 max-w-4xl text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-gradient"
        />

        {description ? (
          <Reveal delay={0.2}>
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-400">{description}</div>
          </Reveal>
        ) : null}

        {children ? (
          <Reveal delay={0.3}>
            <div className="mt-8">{children}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
