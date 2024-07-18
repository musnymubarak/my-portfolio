import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Info } from 'lucide-react'

import { blogPosts, getPost, getRelatedPosts } from '@/content/blog'
import { profile, siteConfig } from '@/content/profile'
import { PageHeader } from '@/components/layout/page-header'
import { ArticleBody } from '@/components/blog/article-body'
import { ArticleCard } from '@/components/blog/article-card'
import { ShareBar } from '@/components/blog/share-bar'
import { Badge, Section } from '@/components/ui/primitives'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article not found' }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    tags: post.tags,
    // Publication dates are approximate, so none is asserted in metadata.
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug)
  const url = `${siteConfig.url}/blog/${post.slug}`

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Person', name: profile.name, url: siteConfig.url },
          publisher: { '@type': 'Person', name: profile.name },
          mainEntityOfPage: url,
          keywords: post.tags.join(', '),
          articleSection: post.category,
        }}
      />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Writing', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-500">
          <span>
            {post.date}
            {post.dateIsApproximate ? <span className="text-ink-600"> (approx.)</span> : null}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article className="min-w-0 max-w-2xl">
            <ArticleBody markdown={post.body} />

            <aside className="mt-14 flex gap-3 rounded-xl border border-[var(--hairline)] bg-base-900 p-5">
              <Info className="mt-0.5 size-4 shrink-0 text-ink-500" aria-hidden="true" />
              <p className="text-[0.8125rem] leading-relaxed text-ink-500">{post.sourceNote}</p>
            </aside>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="mt-10 border-t border-[var(--hairline)] pt-8">
              <ShareBar title={post.title} url={url} />
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-[var(--hairline)] bg-base-900 p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                Written by
              </p>
              <p className="mt-3 text-base font-semibold text-ink-100">{profile.name}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-400">
                {profile.currentRole.title} at {profile.currentRole.company}
              </p>
              <Link
                href="/about"
                className="mt-4 inline-flex min-h-6 items-center py-1 text-[0.8125rem] text-signal-300 underline underline-offset-4"
              >
                More about me
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="related-articles">
          <h2 id="related-articles" className="eyebrow">
            Related reading
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.slug} post={item} className="h-full" />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}
