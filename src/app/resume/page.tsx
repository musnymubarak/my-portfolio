import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'

import { profile, resumeVariants } from '@/content/profile'
import { education, experience } from '@/content/experience'
import { skillGroups } from '@/content/skills'
import { certificationsByDate, displayIssuer } from '@/content/certifications'
import { projectsByWeight } from '@/content/projects'
import { PageHeader } from '@/components/layout/page-header'
import { Badge, Rule, Section } from '@/components/ui/primitives'
import { ContactCta } from '@/components/home/home-sections'
import { Reveal } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Résumé',
  description:
    'Experience, skills, education and certifications, with downloadable résumés tailored to DevOps, software engineering and full-stack roles.',
  path: '/resume',
})

export default function ResumePage() {
  const highlightProjects = projectsByWeight.slice(0, 6)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Résumé', path: '/resume' },
        ])}
      />

      <PageHeader
        eyebrow="Résumé"
        title="The full record"
        description="Three versions are available, each written for a different kind of role. The DevOps document is the most current."
      />

      <Section ariaLabelledBy="downloads-heading">
        <h2 id="downloads-heading" className="eyebrow">
          Downloads
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {resumeVariants.map((variant, index) => (
            <Reveal key={variant.id} delay={index * 0.06}>
              <article className="group flex h-full flex-col rounded-xl border border-[var(--hairline)] bg-base-900 p-6 transition-colors hover:border-[var(--hairline-strong)]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink-100">{variant.label}</h3>
                  {index === 0 ? <Badge tone="signal">Most current</Badge> : null}
                </div>

                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-400">
                  {variant.description}
                </p>

                <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-600">
                  PDF · {variant.size} · Updated {variant.updated}
                </p>

                <a
                  href={variant.file}
                  download
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--hairline-strong)] text-sm font-medium text-ink-100 transition-colors group-hover:border-signal-400/60 group-hover:bg-signal-400/10"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="summary-heading">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="summary-heading" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Summary
          </h2>
          <div className="prose-technical max-w-2xl">
            {profile.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="resume-experience">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="resume-experience" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Experience
          </h2>

          <ol className="min-w-0 space-y-12">
            {experience.map((role) => (
              <Reveal as="li" key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-ink-100">{role.title}</h3>
                  <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-500">
                    {role.start} — {role.end}
                  </p>
                </div>
                <p className="mt-1 text-sm text-signal-300">{role.company}</p>

                <ul className="prose-technical mt-5">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="resume-skills">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="resume-skills" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Skills
          </h2>

          <dl className="min-w-0">
            {skillGroups.map((group) => (
              <div
                key={group.id}
                className="grid gap-3 border-t border-[var(--hairline)] py-6 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8"
              >
                <dt className="text-sm font-medium text-ink-100">{group.title}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge key={skill.name} tone={skill.level === 'production' ? 'signal' : 'neutral'}>
                      {skill.name}
                    </Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="resume-projects">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="resume-projects" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Selected projects
          </h2>

          <ul className="min-w-0">
            {highlightProjects.map((project) => (
              <li key={project.slug} className="border-t border-[var(--hairline)] py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-ink-100">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors hover:text-signal-300"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-500">
                    {project.category}
                  </p>
                </div>
                <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-400">
                  {project.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 lg:pl-[calc(14rem+4rem)]">
          <Link
            href="/projects"
            className="inline-flex min-h-6 items-center py-1 text-sm text-signal-300 underline underline-offset-4 hover:text-signal-200"
          >
            All {projectsByWeight.length} projects
          </Link>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="resume-education">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="resume-education" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Education
          </h2>

          <ul className="min-w-0">
            {education.map((entry) => (
              <li key={entry.id} className="border-t border-[var(--hairline)] py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-ink-100">{entry.qualification}</h3>
                  <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-500">
                    {entry.start} — {entry.end}
                  </p>
                </div>
                <p className="mt-1 text-sm text-ink-400">{entry.institution}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="resume-certifications">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <h2 id="resume-certifications" className="eyebrow lg:sticky lg:top-28 lg:self-start">
            Certifications
          </h2>

          <div className="min-w-0">
            <ul>
              {certificationsByDate.map((certification) => (
                <li
                  key={certification.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--hairline)] py-3.5"
                >
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-200 transition-colors hover:text-signal-300"
                  >
                    {certification.name}
                    <ExternalLink
                      className="size-3 text-ink-600 transition-colors group-hover:text-signal-400"
                      aria-hidden="true"
                    />
                  </a>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-500">
                    {displayIssuer(certification.authorizedBy ?? certification.issuer)} ·{' '}
                    {certification.issuedOn}
                  </p>
                </li>
              ))}
            </ul>
            <Rule className="mt-6" />
            <p className="mt-4 text-[0.8125rem] text-ink-500">
              All {certificationsByDate.length} credentials are verifiable on{' '}
              <a
                href="https://www.credly.com/users/mohamed-musni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal-300 underline underline-offset-4"
              >
                Credly
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  )
}
