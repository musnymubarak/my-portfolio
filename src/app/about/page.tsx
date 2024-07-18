import type { Metadata } from 'next'
import Image from 'next/image'
import { GraduationCap, Layers, Repeat, Wrench } from 'lucide-react'

import { profile } from '@/content/profile'
import { careerTimeline, education, experience } from '@/content/experience'
import { certifications } from '@/content/certifications'
import { projects } from '@/content/projects'
import { PageHeader } from '@/components/layout/page-header'
import { Section, SectionHeader } from '@/components/ui/primitives'
import { Expertise } from '@/components/home/expertise'
import { ContactCta } from '@/components/home/home-sections'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Software engineer at Hashnate working across backend services and the Kubernetes, Terraform and GitLab CI/CD infrastructure they deploy to.',
  path: '/about',
})

/**
 * Working principles. Each one restates a claim made in the source resume
 * rather than introducing anything new.
 */
const principles = [
  {
    icon: Layers,
    title: 'One problem, not three',
    detail:
      'When something breaks, the stack trace, the pipeline log and the cluster events are the same investigation. Owning both sides of that line is the whole point.',
  },
  {
    icon: Repeat,
    title: 'Reviewable by default',
    detail:
      'Environments are provisioned from Terraform modules and reconciled through ArgoCD, so a change to production is a change to a file someone can read in a diff.',
  },
  {
    icon: Wrench,
    title: 'End to end, not handed over',
    detail:
      'API design, tests, container build, pipeline, deployment, then debugging it in production. The feature is not finished at the boundary.',
  },
  {
    icon: GraduationCap,
    title: 'Unfamiliar is fine',
    detail:
      'Go for a blockchain component, Flutter for a mobile client, RAG and Gemini for document intelligence. Picking up a new language or platform is part of the job.',
  },
] as const

export default function AboutPage() {
  const liveProjects = projects.filter((project) =>
    project.links.some((link) => link.kind === 'live'),
  ).length

  const sectors = new Set(
    projects.map((project) => project.industry).filter((industry): industry is string => Boolean(industry)),
  )

  const stats = [
    { value: String(projects.length), label: 'Projects delivered' },
    { value: String(liveProjects), label: 'Live in production' },
    { value: String(sectors.size), label: 'Client sectors' },
    { value: String(certifications.length), label: 'Verified credentials' },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHeader
        eyebrow="About"
        title="Engineer on both sides of the deploy"
        description={profile.positioning}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="prose-technical max-w-none">
            {profile.summary.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:self-start">
            <div>
              <Image
                src="/images/profile/portrait.webp"
                alt={`${profile.name}, ${profile.title}`}
                width={1254}
                height={1254}
                quality={90}
                sizes="(min-width: 1024px) 320px, 100vw"
                className="w-full rounded-xl border border-[var(--hairline-strong)] object-cover"
              />
              <dl className="mt-6 space-y-3">
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-3">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                    Currently
                  </dt>
                  <dd className="text-right text-sm text-ink-200">
                    {profile.currentRole.title}, {profile.currentRole.company}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-3">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                    Based in
                  </dt>
                  <dd className="text-sm text-ink-200">{profile.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                    Studied
                  </dt>
                  <dd className="text-right text-sm text-ink-200">
                    BSc (Hons) IT, University of Jaffna
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--hairline)] lg:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealItem key={stat.label} index={index} className="bg-base-900 px-5 py-7 text-center sm:px-6">
              <p className="font-display text-[2.25rem] font-semibold leading-none text-ink-50">
                {stat.value}
              </p>
              <p className="mt-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="journey-heading">
        <SectionHeader
          eyebrow="Career"
          title={<span id="journey-heading">How I got here</span>}
          description="From MERN coursework, through cloud deployment, into operating production clusters."
        />

        <ol className="relative mt-14 border-l border-[var(--hairline)] pl-8 sm:pl-10">
          {careerTimeline.map((entry, index) => (
            <Reveal as="li" key={entry.title} delay={index * 0.06} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-base-950 bg-signal-400 sm:-left-[calc(2.5rem+5px)]"
                aria-hidden="true"
              />
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-signal-300">
                {entry.period}
              </p>
              <h3 className="mt-2.5 text-lg font-semibold text-ink-100">{entry.title}</h3>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-400">
                {entry.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="principles-heading">
        <SectionHeader
          eyebrow="How I work"
          title={<span id="principles-heading">Four things that shape the work</span>}
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <RevealItem
              key={principle.title}
              index={index}
              className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6"
            >
              <principle.icon className="size-5 text-signal-400" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-ink-100">{principle.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-400">
                {principle.detail}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Expertise />

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="education-heading">
        <SectionHeader
          eyebrow="Education & roles"
          title={<span id="education-heading">The formal record</span>}
          action={{ label: 'Full résumé', href: '/resume' }}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
              Education
            </h3>
            {education.map((entry) => (
              <Reveal key={entry.id}>
                <div className="mt-5 rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
                  <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-500">
                    {entry.start} — {entry.end}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold text-ink-100">{entry.qualification}</h4>
                  <p className="mt-1 text-sm text-ink-400">{entry.institution}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
              Roles
            </h3>
            <div className="mt-5 space-y-4">
              {experience.map((role, index) => (
                <Reveal key={role.id} delay={index * 0.06}>
                  <div className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
                    <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-500">
                      {role.start} — {role.end}
                    </p>
                    <h4 className="mt-3 text-lg font-semibold text-ink-100">{role.title}</h4>
                    <p className="mt-1 text-sm text-ink-400">{role.company}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  )
}
