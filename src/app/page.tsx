import { Hero } from '@/components/home/hero'
import { SelectedWork } from '@/components/home/selected-work'
import { Expertise } from '@/components/home/expertise'
import { ExperiencePreview } from '@/components/home/experience-preview'
import {
  CertificationsPreview,
  ContactCta,
  LatestArticles,
} from '@/components/home/home-sections'
import { JsonLd } from '@/components/seo/json-ld'
import { personSchema } from '@/lib/seo'

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <Hero />
      <SelectedWork />
      <Expertise />
      <ExperiencePreview />
      <CertificationsPreview />
      <LatestArticles />
      <ContactCta />
    </>
  )
}
