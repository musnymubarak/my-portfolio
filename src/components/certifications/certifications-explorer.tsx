'use client'

import { useMemo, useState } from 'react'

import type { Certification } from '@/content/types'
import { CertificationCard } from './certification-card'
import { IssuerLogo } from './issuer-logo'
import { displayIssuer } from '@/content/certifications'
import { cn } from '@/lib/utils'

const ALL = 'All'

export function CertificationsExplorer({
  certifications,
  issuers,
}: {
  certifications: Certification[]
  issuers: string[]
}) {
  const [issuer, setIssuer] = useState(ALL)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const certification of certifications) {
      const key = certification.authorizedBy ?? certification.issuer
      map.set(key, (map.get(key) ?? 0) + 1)
    }
    return map
  }, [certifications])

  const filtered = useMemo(
    () =>
      issuer === ALL
        ? certifications
        : certifications.filter((c) => (c.authorizedBy ?? c.issuer) === issuer),
    [certifications, issuer],
  )

  return (
    <div>
      <fieldset className="border-y border-[var(--hairline)] py-6">
        <legend className="sr-only">Filter by issuing organisation</legend>
        <div className="flex flex-wrap gap-2">
          <Chip
            label="All issuers"
            count={certifications.length}
            active={issuer === ALL}
            onSelect={() => setIssuer(ALL)}
          />
          {issuers.map((option) => (
            <Chip
              key={option}
              label={displayIssuer(option)}
              count={counts.get(option) ?? 0}
              issuer={option}
              active={issuer === option}
              onSelect={() => setIssuer(option)}
            />
          ))}
        </div>
      </fieldset>

      <p
        className="mt-8 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-500"
        aria-live="polite"
      >
        {filtered.length} {filtered.length === 1 ? 'credential' : 'credentials'}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((certification) => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            className="h-full"
          />
        ))}
      </div>
    </div>
  )
}

function Chip({
  label,
  count,
  active,
  issuer,
  onSelect,
}: {
  label: string
  count: number
  active: boolean
  issuer?: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200',
        active
          ? 'border-signal-400/50 bg-signal-400/12 text-signal-200'
          : 'border-[var(--hairline-strong)] bg-base-900 text-ink-400 hover:border-ink-600 hover:text-ink-100',
      )}
    >
      {issuer && <IssuerLogo issuer={issuer} className="size-3.5 shrink-0" />}
      <span>{label}</span>
      <span className={cn('font-mono text-[0.6875rem]', active ? 'text-signal-300' : 'text-ink-600')}>
        {count}
      </span>
    </button>
  )
}
