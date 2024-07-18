import Link from 'next/link'

import { ButtonLink } from '@/components/ui/button'
import { navigation } from '@/content/profile'

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow">Error 404</p>

      <h1 className="mt-6 text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-gradient">
        This route does not resolve
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-400">
        The page you asked for is not here. It may have moved, or the link may have been mistyped.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg" magnetic>
          Back to home
        </ButtonLink>
        <ButtonLink href="/projects" variant="secondary" size="lg">
          Browse projects
        </ButtonLink>
      </div>

      <nav aria-label="All pages" className="mt-14 border-t border-[var(--hairline)] pt-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
          Everything else
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-ink-400 transition-colors hover:text-signal-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
