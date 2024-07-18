import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'

import type { BlogPost } from '@/content/types'
import { Badge } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function ArticleCard({
  post,
  className,
  compact = false,
}: {
  post: BlogPost
  className?: string
  compact?: boolean
}) {
  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border border-[var(--hairline)] bg-base-900 p-6 transition-colors duration-300 hover:border-[var(--hairline-strong)]',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
        <span className="text-signal-300">{post.category}</span>
        <span aria-hidden="true">·</span>
        <span>
          {post.date}
          {post.dateIsApproximate ? (
            <span className="text-ink-600" title="Approximate — the source post shows a relative date">
              {' '}
              (approx.)
            </span>
          ) : null}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" aria-hidden="true" />
          {post.readingMinutes} min
        </span>
      </div>

      <h3
        className={cn(
          'font-semibold leading-snug text-ink-100',
          compact ? 'text-base' : 'text-xl',
        )}
      >
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className={cn('text-ink-400', compact ? 'text-[0.8125rem]' : 'text-[0.9375rem] leading-relaxed')}>
        {post.excerpt}
      </p>

      {!compact ? (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}

      <span
        className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-300 transition-colors group-hover:text-signal-300"
        aria-hidden="true"
      >
        Read article
        <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </article>
  )
}
