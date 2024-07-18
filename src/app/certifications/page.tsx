import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'

import {
  certificationIssuers,
  certifications,
  certificationsByDate,
} from '@/content/certifications'
import { PageHeader } from '@/components/layout/page-header'
import { CertificationsExplorer } from '@/components/certifications/certifications-explorer'
import { ContactCta } from '@/components/home/home-sections'
import { ButtonLink } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Certifications',
  description: `${certifications.length} verified credentials from IBM, Meta, Google, Cisco and AWS, each linking to its original badge on Credly.`,
  path: '/certifications',
})

export default function CertificationsPage() {
  const newest = certificationsByDate[0]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Certifications', path: '/certifications' },
        ])}
      />

      <PageHeader
        eyebrow="Certifications"
        title="Credentials you can check"
        description={
          <>
            {certifications.length} badges issued between October 2023 and{' '}
            {newest?.issuedOn.split(' ').slice(1).join(' ')}, covering Kubernetes and CI/CD,
            microservices and serverless, cloud fundamentals, full-stack engineering and UX. Every
            entry links straight to its Credly record.
          </>
        }
      >
        <ButtonLink href="https://www.credly.com/users/mohamed-musni" variant="secondary" magnetic>
          <ExternalLink className="size-4" aria-hidden="true" />
          View the full Credly profile
        </ButtonLink>
      </PageHeader>

      <div className="shell py-14 sm:py-16">
        <CertificationsExplorer
          certifications={certificationsByDate}
          issuers={certificationIssuers}
        />
      </div>

      <ContactCta />
    </>
  )
}
