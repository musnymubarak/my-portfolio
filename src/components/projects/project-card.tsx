'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import type { ProjectSummary } from '@/content/types'
import { cn, hexToRgbChannels } from '@/lib/utils'
import { Badge } from '@/components/ui/primitives'
import { TopologyArt } from './topology-art'

interface ProjectCardProps {
  project: ProjectSummary
  /** Larger treatment used for the first card in the featured grid. */
  featured?: boolean
  className?: string
}

export function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const cover = project.cover

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`)
    card.style.setProperty('--spot-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    card.style.setProperty('--spot-y', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      className={cn(
        'group relative isolate overflow-hidden rounded-xl border border-[var(--hairline)] bg-base-900 transition-[border-color,box-shadow] duration-300',
        'hover:border-[var(--hairline-strong)] hover:shadow-[var(--shadow-card)]',
        'motion-safe:[transform:perspective(1200px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] motion-safe:transition-transform motion-safe:duration-300',
        className,
      )}
      style={{ ['--accent' as string]: project.accent }}
    >
      {/* Cursor-tracked highlight, purely decorative. */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${hexToRgbChannels(project.accent)}, 0.10), transparent 62%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative overflow-hidden border-b border-[var(--hairline)] bg-base-850',
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]',
        )}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes={
              featured
                ? '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.035]"
          />
        ) : (
          <TopologyArt accent={project.accent} />
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-900 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className={cn('relative z-10 flex flex-col', featured ? 'gap-4 p-6 sm:p-8' : 'gap-3 p-5')}>
        <div className="flex items-center gap-2.5">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: project.accent }}
            aria-hidden="true"
          />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
            {project.category}
          </span>
        </div>

        <h3
          className={cn(
            'font-semibold leading-tight text-ink-100',
            featured ? 'text-2xl sm:text-[1.75rem]' : 'text-lg',
          )}
        >
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>

        <p className={cn('text-ink-400', featured ? 'max-w-2xl text-[0.9375rem]' : 'text-sm')}>
          {project.tagline}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, featured ? 6 : 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > (featured ? 6 : 3) ? (
            <Badge tone="muted">+{project.technologies.length - (featured ? 6 : 3)}</Badge>
          ) : null}
        </div>

        <span
          className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-300 transition-colors group-hover:text-signal-300"
          aria-hidden="true"
        >
          View case study
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  )
}
