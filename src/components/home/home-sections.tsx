import { ArrowUpRight, Mail } from 'lucide-react'

import { certifications, featuredCertifications } from '@/content/certifications'
import { featuredPosts } from '@/content/blog'
import { profile, socialLinks } from '@/content/profile'
import { CertificationCard } from '@/components/certifications/certification-card'
import { ArticleCard } from '@/components/blog/article-card'
import { Section, SectionHeader } from '@/components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'

export function CertificationsPreview() {
  return (
    <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="certifications-heading">
      <SectionHeader
        eyebrow="Certifications"
        title={<span id="certifications-heading">Verified credentials</span>}
        description={`${certifications.length} badges on Credly, from IBM, Meta, Google, Cisco and AWS. Every one links back to its original credential.`}
        action={{ label: 'All certifications', href: '/certifications' }}
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCertifications.slice(0, 6).map((certification, index) => (
          <RevealItem key={certification.id} index={index}>
            <CertificationCard certification={certification} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export function LatestArticles() {
  return (
    <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="articles-heading">
      <SectionHeader
        eyebrow="Writing"
        title={<span id="articles-heading">Notes from the work</span>}
        description="Short technical pieces on deployment, containers and the tools that make a small budget go further."
        action={{ label: 'All articles', href: '/blog' }}
      />

      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
        {featuredPosts.slice(0, 3).map((post, index) => (
          <RevealItem key={post.slug} index={index}>
            <ArticleCard post={post} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export function ContactCta() {
  return (
    <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="contact-cta-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-base-900 px-6 py-14 sm:px-12 sm:py-20">
          <div
            className="grid-field pointer-events-none absolute inset-0 opacity-50"
            style={{
              maskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, #000, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, #000, transparent 72%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in oklab, var(--color-signal-400) 12%, transparent), transparent 66%)',
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Next step</p>
            <h2
              id="contact-cta-heading"
              className="mt-5 text-[clamp(1.875rem,5vw,3rem)] font-semibold leading-[1.1]"
            >
              Got something that needs building and running?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-400">
              I am open to engineering roles, freelance work and technical collaboration. The
              fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" magnetic>
                <Mail className="size-4" aria-hidden="true" />
                Start a conversation
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary" size="lg">
                Browse the work
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-500 transition-colors hover:text-ink-100"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[0.75rem] text-ink-600">
              {profile.email} · {profile.location}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
