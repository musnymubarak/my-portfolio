import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

import { profile, socialLinks } from '@/content/profile'
import { PageHeader } from '@/components/layout/page-header'
import { ContactForm } from '@/components/contact/contact-form'
import { Section } from '@/components/ui/primitives'
import { brandIcons } from '@/components/ui/brand-icons'
import { Reveal } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: `Get in touch with ${profile.name} about engineering roles, freelance work or technical collaboration.`,
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let us talk about the work"
        description="I am open to engineering roles, freelance projects and technical collaboration. Tell me what you are building and where it is getting stuck."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="min-w-0">
            <h2 className="eyebrow">Send a message</h2>
            <div className="mt-8">
              <ContactForm fallbackEmail={profile.email} />
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <Reveal>
              <div className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
                <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                  Direct
                </h2>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 flex min-h-6 items-start gap-3 py-1 text-[0.9375rem] text-ink-200 transition-colors hover:text-signal-300"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-ink-500" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>

                <p className="mt-4 flex items-start gap-3 text-[0.9375rem] text-ink-300">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-ink-500" aria-hidden="true" />
                  {profile.location}
                </p>

                <p className="mt-5 border-t border-[var(--hairline)] pt-4 text-[0.8125rem] leading-relaxed text-ink-500">
                  Currently {profile.currentRole.title} at {profile.currentRole.company}.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
                <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                  Profiles
                </h2>

                <ul className="mt-4 space-y-1">
                  {socialLinks.map((link) => {
                    const Icon = brandIcons[link.icon as keyof typeof brandIcons]
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-base-850"
                        >
                          {Icon ? (
                            <Icon className="size-4 shrink-0 text-ink-500 transition-colors group-hover:text-signal-400" />
                          ) : null}
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.9375rem] text-ink-200">{link.label}</span>
                            <span className="block truncate font-mono text-[0.6875rem] text-ink-600">
                              {link.handle}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="size-3.5 shrink-0 text-ink-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  )
}
