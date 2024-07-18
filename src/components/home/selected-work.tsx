import { featuredProjects, toSummary } from '@/content/projects'
import { WorkIndex } from './work-index'
import { Section, SectionHeader } from '@/components/ui/primitives'

export function SelectedWork() {
  return (
    <Section id="selected-work" ariaLabelledBy="selected-work-heading">
      <SectionHeader
        eyebrow="Selected work"
        title={<span id="selected-work-heading">Things I have built and shipped</span>}
        description="Production platforms, an institutional ERP, and the infrastructure work underneath them."
        action={{ label: 'All projects', href: '/projects' }}
      />

      <WorkIndex projects={featuredProjects.map(toSummary)} />
    </Section>
  )
}
