import type { Metadata } from 'next'

import {
  projectCategories,
  projectSummaries,
  projectTechnologies,
  projects,
} from '@/content/projects'
import { PageHeader } from '@/components/layout/page-header'
import { ProjectsExplorer } from '@/components/projects/projects-explorer'
import { ContactCta } from '@/components/home/home-sections'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Production platforms, an institutional ERP, client websites and infrastructure work — with the stack and the reasoning behind each build.',
  path: '/projects',
})

export default function ProjectsPage() {
  const liveCount = projects.filter((project) =>
    project.links.some((link) => link.kind === 'live'),
  ).length

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <PageHeader
        eyebrow="Projects"
        title="Work that shipped"
        description={
          <>
            {projects.length} projects, {liveCount} of them live on the public internet. Platforms,
            an institutional ERP, client products and the infrastructure work underneath them.
          </>
        }
      />

      <div className="shell py-14 sm:py-16">
        <ProjectsExplorer
          projects={projectSummaries}
          categories={projectCategories}
          technologies={projectTechnologies}
        />
      </div>

      <ContactCta />
    </>
  )
}
