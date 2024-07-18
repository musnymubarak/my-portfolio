import type { Metadata } from 'next'

import { profile, siteConfig } from '@/content/profile'

interface PageMetaInput {
  title: string
  description: string
  /** Path only, e.g. "/projects/daily-grocer". */
  path: string
  /** Overrides the default Open Graph image. */
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}

/**
 * Builds page metadata with a canonical URL and matching Open Graph and
 * Twitter cards. Every route uses this so no page can quietly ship without a
 * canonical or a social card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  tags,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? siteConfig.ogImage

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/** schema.org Person, emitted once on the home page. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.legalName,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.currentRole.title,
    worksFor: { '@type': 'Organization', name: profile.currentRole.company },
    address: { '@type': 'PostalAddress', addressCountry: 'LK' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Jaffna' },
    description: profile.shortBio,
    sameAs: [
      'https://github.com/musnymubarak',
      'https://www.linkedin.com/in/musny-mubarak/',
      'https://www.credly.com/users/mohamed-musni',
      'https://www.fiverr.com/users/musny_mubarak/',
    ],
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}
