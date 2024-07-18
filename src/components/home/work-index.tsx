'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { ProjectSummary } from '@/content/types'
import { TopologyArt } from '@/components/projects/topology-art'
import { cn, hexToRgbChannels } from '@/lib/utils'

/**
 * Selected work, as an index rather than a grid of cards.
 *
 * Six names in a single column can be read in one pass, where six cards have
 * to be scanned one at a time. Imagery is not lost: on wide screens a pinned
 * panel shows the active project, driven by hover AND focus so a keyboard
 * reaches every preview. Narrow screens drop the panel entirely and give each
 * project its own image inline, because hover does not exist on touch and a
 * preview nobody can trigger is dead weight.
 *
 * Without JavaScript the first project stays previewed and every row still
 * renders in full, so nothing depends on the interaction.
 */
export function WorkIndex({ projects }: { projects: ProjectSummary[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-14">
      <ol className="min-w-0">
        {projects.map((project, index) => {
          const isActive = index === activeIndex
          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="group relative block border-t border-[var(--hairline)] py-6 outline-offset-4 last:border-b sm:py-7"
                style={{ ['--accent' as string]: project.accent }}
              >
                {/* Accent wash, strongest at the leading edge. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-y-0 -left-4 -right-4 rounded-lg transition-opacity duration-300 lg:-left-6 lg:-right-6',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                  style={{
                    background: `linear-gradient(90deg, rgba(${hexToRgbChannels(project.accent)}, 0.10), transparent 62%)`,
                  }}
                />

                {/* Growing rule in the project's own colour. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute left-0 top-0 h-px origin-left transition-transform duration-500 ease-[var(--ease-out-expo)]',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                  style={{ width: '100%', background: project.accent }}
                />

                {/* Inline image, narrow screens only. */}
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-[var(--hairline)] bg-base-850 lg:hidden">
                  {project.cover ? (
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      sizes="(max-width: 1024px) 100vw, 0px"
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <TopologyArt accent={project.accent} />
                  )}
                </div>

                <div className="relative flex items-start gap-4 sm:gap-6">
                  {/* The index uses a guaranteed-contrast colour rather than the
                      project accent: those are sampled from client branding and
                      several of them fall below AA as small text. The accent
                      still carries identity through the rule, wash and arrow. */}
                  <span
                    className={cn(
                      'mt-1.5 shrink-0 font-mono text-[0.75rem] tabular-nums transition-colors duration-300',
                      isActive ? 'text-ink-100' : 'text-ink-600',
                    )}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        'font-display text-[clamp(1.5rem,4.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] transition-[color,transform] duration-300 ease-[var(--ease-out-expo)]',
                        isActive ? 'text-ink-50 lg:translate-x-2' : 'text-ink-300',
                      )}
                    >
                      {project.name}
                    </h3>

                    <div
                      className={cn(
                        'mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-[color,transform] duration-300 ease-[var(--ease-out-expo)]',
                        isActive ? 'text-ink-300 lg:translate-x-2' : 'text-ink-500',
                      )}
                    >
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-ink-600">
                        /
                      </span>
                      <span className="normal-case tracking-normal">
                        {project.technologies.slice(0, 3).join(' · ')}
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-400 lg:hidden">
                      {project.tagline}
                    </p>
                  </div>

                  <ArrowUpRight
                    className={cn(
                      'mt-1.5 size-5 shrink-0 transition-[color,transform] duration-300 ease-[var(--ease-out-expo)]',
                      isActive
                        ? 'translate-x-0 text-[var(--accent)] opacity-100'
                        : 'text-ink-600 opacity-60 lg:-translate-x-1',
                    )}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          )
        })}
      </ol>

      {/* Pinned preview. Decorative — every fact it shows is already in the row. */}
      <div className="hidden lg:block" aria-hidden="true">
        <div className="sticky top-28 overflow-hidden rounded-xl border border-[var(--hairline)] bg-base-900">
          {/* Landscape, because the sources are wide product screenshots and a
              portrait frame would crop them to an unreadable slice. */}
          <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--hairline)] bg-base-850">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-expo)]',
                  index === activeIndex ? 'opacity-100' : 'opacity-0',
                )}
              >
                {project.cover ? (
                  <Image
                    src={project.cover.src}
                    alt=""
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes="368px"
                    className="size-full object-cover object-top"
                  />
                ) : (
                  <TopologyArt accent={project.accent} />
                )}
              </div>
            ))}
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2.5">
              <span
                className="size-1.5 shrink-0 rounded-full transition-colors duration-300"
                style={{ background: active?.accent }}
              />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                {active?.category}
              </span>
            </div>

            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">{active?.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {active?.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] bg-base-850 px-2.5 py-1 font-mono text-[0.6875rem] text-ink-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
