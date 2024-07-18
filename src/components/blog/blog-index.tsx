'use client'

import { useMemo, useState } from 'react'

import type { BlogPost } from '@/content/types'
import { ArticleCard } from './article-card'
import { cn } from '@/lib/utils'

const ALL = 'All'

export function BlogIndex({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState(ALL)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const post of posts) map.set(post.category, (map.get(post.category) ?? 0) + 1)
    return map
  }, [posts])

  const filtered = useMemo(
    () => (category === ALL ? posts : posts.filter((post) => post.category === category)),
    [posts, category],
  )

  const [lead, ...rest] = filtered

  return (
    <div>
      <fieldset className="border-y border-[var(--hairline)] py-6">
        <legend className="sr-only">Filter by category</legend>
        <div className="flex flex-wrap gap-2">
          {[ALL, ...categories].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-200',
                category === option
                  ? 'border-signal-400/50 bg-signal-400/12 text-signal-200'
                  : 'border-[var(--hairline-strong)] bg-base-900 text-ink-400 hover:border-ink-600 hover:text-ink-100',
              )}
            >
              {option === ALL ? 'All writing' : option}
              <span
                className={cn(
                  'font-mono text-[0.6875rem]',
                  category === option ? 'text-signal-300' : 'text-ink-600',
                )}
              >
                {option === ALL ? posts.length : (counts.get(option) ?? 0)}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {lead ? (
        <div className="mt-10">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
            Latest
          </p>
          <div className="mt-4">
            <ArticleCard post={lead} />
          </div>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <ArticleCard key={post.slug} post={post} className="h-full" />
          ))}
        </div>
      ) : null}
    </div>
  )
}
