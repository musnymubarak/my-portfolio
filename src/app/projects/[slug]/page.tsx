import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

import { getProject, getRelatedProjects, projects, toSummary } from '@/content/projects'
import { siteConfig } from '@/content/profile'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { ProjectCard } from '@/components/projects/project-card'
import { PageHeader } from '@/components/layout/page-header'
import { Badge, DataRow, Section } from '@/components/ui/primitives'
import { ButtonLink } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/brand-icons'
import { Reveal } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }

  const cover = project.screenshots[0]

  return pageMetadata({
    title: project.name,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    ...(cover ? { image: `${siteConfig.url}${cover.src}` } : {}),
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = getRelatedProjects(slug)
  const liveLink = project.links.find((link) => link.kind === 'live')
  const sourceLink = project.links.find((link) => link.kind === 'source')

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={project.category}
        title={project.name}
        description={project.overview}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name, href: `/projects/${project.slug}` },
        ]}
      >
        <div className="flex flex-col gap-6">
          {project.links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {liveLink ? (
                <ButtonLink href={liveLink.href} magnetic>
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Visit {liveLink.label}
                </ButtonLink>
              ) : null}
              {sourceLink ? (
                <ButtonLink href={sourceLink.href} variant="secondary">
                  <GithubIcon className="size-4" />
                  {sourceLink.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}

          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {project.client ? (
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                  Client
                </dt>
                <dd className="mt-1.5 text-sm text-ink-200">{project.client}</dd>
              </div>
            ) : null}
            {project.industry ? (
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                  Sector
                </dt>
                <dd className="mt-1.5 text-sm text-ink-200">{project.industry}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
                Discipline
              </dt>
              <dd className="mt-1.5 text-sm text-ink-200">{project.category}</dd>
            </div>
          </dl>
        </div>
      </PageHeader>

      {/* Lead image, full-bleed within the shell. */}
      {project.screenshots[0] ? (
        <div className="shell -mt-px pt-12 sm:pt-16">
          <Reveal>
            <figure>
              <Image
                src={project.screenshots[0].src}
                alt={project.screenshots[0].alt}
                width={project.screenshots[0].width}
                height={project.screenshots[0].height}
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="w-full rounded-xl border border-[var(--hairline)] object-cover"
              />
            </figure>
          </Reveal>
        </div>
      ) : null}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0">
            {project.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.05}>
                <div className={index > 0 ? 'mt-14' : ''}>
                  <h2 className="text-[1.5rem] font-semibold leading-tight text-ink-100">
                    {section.heading}
                  </h2>

                  {section.body ? (
                    <div className="prose-technical mt-5">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="prose-technical mt-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.rows ? (
                    <dl className="mt-5">
                      {section.rows.map((row) => (
                        <DataRow key={row.term} term={row.term} detail={row.detail} />
                      ))}
                    </dl>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                Technologies
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>

              {project.links.length > 0 ? (
                <>
                  <h2 className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                    Links
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm text-ink-300 transition-colors hover:text-signal-300"
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
                </>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>

      {project.screenshots.length > 1 ? (
        <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="gallery-heading">
          <h2 id="gallery-heading" className="eyebrow">
            Gallery
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] text-ink-400">
            {project.screenshots.length} screens from the delivered product. Select any image for a
            larger view.
          </p>
          <div className="mt-10">
            <ProjectGallery screenshots={project.screenshots} />
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="related-heading">
          <h2 id="related-heading" className="eyebrow">
            Related work
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={toSummary(item)} className="h-full" />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}
