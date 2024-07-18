import type { Metadata } from 'next'

import { blogCategories, blogPosts, blogPostsByDate } from '@/content/blog'
import { PageHeader } from '@/components/layout/page-header'
import { BlogIndex } from '@/components/blog/blog-index'
import { ContactCta } from '@/components/home/home-sections'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Writing',
  description:
    'Short technical notes on containers, deployment, self-hosting and the tooling that makes a small budget go further.',
  path: '/blog',
})

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
        ])}
      />

      <PageHeader
        eyebrow="Writing"
        title="Notes from the work"
        description={`${blogPosts.length} short pieces on deployment, containers, hosting and tooling — adapted from posts I originally wrote on LinkedIn.`}
      />

      <div className="shell py-14 sm:py-16">
        <BlogIndex posts={blogPostsByDate} categories={blogCategories} />
      </div>

      <ContactCta />
    </>
  )
}
