'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'

import type { ProjectSummary } from '@/content/types'
import { ProjectCard } from './project-card'
import { cn } from '@/lib/utils'

interface ProjectsExplorerProps {
  projects: ProjectSummary[]
  categories: string[]
  technologies: string[]
}

const ALL = 'All'

export function ProjectsExplorer({ projects, categories, technologies }: ProjectsExplorerProps) {
  const [category, setCategory] = useState<string>(ALL)
  const [technology, setTechnology] = useState<string>(ALL)
  const [query, setQuery] = useState('')

  // Keeps typing responsive while the grid re-filters.
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()

    return projects.filter((project) => {
      if (category !== ALL && project.category !== category) return false
      if (technology !== ALL && !project.technologies.includes(technology)) return false
      if (!needle) return true

      return (
        project.name.toLowerCase().includes(needle) ||
        project.tagline.toLowerCase().includes(needle) ||
        project.category.toLowerCase().includes(needle) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(needle))
      )
    })
  }, [projects, category, technology, deferredQuery])

  const hasFilters = category !== ALL || technology !== ALL || query.trim().length > 0

  const reset = () => {
    setCategory(ALL)
    setTechnology(ALL)
    setQuery('')
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-[var(--hairline)] py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <fieldset className="min-w-0">
            <legend className="sr-only">Filter by category</legend>
            <div className="flex flex-wrap gap-2">
              {[ALL, ...categories].map((option) => (
                <FilterChip
                  key={option}
                  label={option === ALL ? 'All work' : option}
                  active={category === option}
                  onSelect={() => setCategory(option)}
                />
              ))}
            </div>
          </fieldset>

          <div className="relative w-full lg:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-500"
              aria-hidden="true"
            />
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects and technologies"
              className="h-11 w-full rounded-full border border-[var(--hairline-strong)] bg-base-900 pl-10 pr-4 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-600 focus:border-signal-400/60"
            />
          </div>
        </div>

        <fieldset>
          <legend className="sr-only">Filter by technology</legend>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="Any technology"
              active={technology === ALL}
              onSelect={() => setTechnology(ALL)}
              size="sm"
            />
            {technologies.map((tech) => (
              <FilterChip
                key={tech}
                label={tech}
                active={technology === tech}
                onSelect={() => setTechnology(tech)}
                size="sm"
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-500" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </p>

        {hasFilters ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-400 transition-colors hover:text-ink-100"
          >
            <X className="size-3.5" aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} className="h-full" />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--hairline-strong)] px-6 py-16 text-center">
          <p className="text-ink-300">No projects match that combination.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 text-sm text-signal-300 underline underline-offset-4"
          >
            Clear the filters
          </button>
        </div>
      )}
    </div>
  )
}

function FilterChip({
  label,
  active,
  onSelect,
  size = 'md',
}: {
  label: string
  active: boolean
  onSelect: () => void
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'rounded-full border transition-colors duration-200',
        size === 'sm'
          ? 'px-2.5 py-1 font-mono text-[0.6875rem]'
          : 'px-4 py-2 text-[0.8125rem] font-medium',
        active
          ? 'border-signal-400/50 bg-signal-400/12 text-signal-200'
          : 'border-[var(--hairline-strong)] bg-base-900 text-ink-400 hover:border-ink-600 hover:text-ink-100',
      )}
    >
      {label}
    </button>
  )
}
