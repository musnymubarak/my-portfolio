import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'

import { navigation, profile, socialLinks } from '@/content/profile'
import { Rule } from '@/components/ui/primitives'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--hairline)] bg-base-950">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="eyebrow">Available for work</p>
            <p className="mt-4 text-lg leading-snug text-ink-100">
              Building backend services and the infrastructure they run on.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex min-h-6 items-center gap-2 py-1 text-sm text-ink-300 transition-colors hover:text-signal-300"
            >
              <Mail className="size-4" aria-hidden="true" />
              {profile.email}
            </a>
            <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-wider text-ink-600">
              {profile.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 items-center py-1 text-sm text-ink-400 transition-colors hover:text-ink-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-6 items-center gap-1.5 py-1 text-sm text-ink-400 transition-colors hover:text-ink-100"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 text-ink-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-400"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="my-10" />

        <div className="flex flex-col gap-3 text-[0.75rem] text-ink-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.legalName}
          </p>
          <p className="font-mono uppercase tracking-wider">
            Built with Next.js, Three.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
