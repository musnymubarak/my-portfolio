import { ExternalLink } from 'lucide-react'

import type { Certification } from '@/content/types'
import { displayIssuer } from '@/content/certifications'
import { IssuerLogo } from './issuer-logo'
import { Badge } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function CertificationCard({
  certification,
  className,
}: {
  certification: Certification
  className?: string
}) {
  const org = certification.authorizedBy ?? certification.issuer

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border border-[var(--hairline)] bg-base-900 p-5 transition-colors duration-300 hover:border-[var(--hairline-strong)] sm:p-6',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-base-800/90 p-1.5 shadow-2xs transition-colors duration-200 group-hover:border-[var(--hairline-strong)] group-hover:bg-base-800">
            <IssuerLogo issuer={org} className="size-5 shrink-0" />
          </div>
          <span className="truncate font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-200">
            {displayIssuer(org)}
          </span>
        </div>
        <time
          dateTime={certification.issuedOnISO}
          className="shrink-0 font-mono text-[0.6875rem] text-ink-500"
        >
          {certification.issuedOn}
        </time>
      </div>

      <h3 className="text-base font-semibold leading-snug text-ink-100">
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0"
        >
          {certification.name}
        </a>
      </h3>

      <p className="line-clamp-3 text-[0.8125rem] leading-relaxed text-ink-500">
        {certification.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {certification.skills.slice(0, 4).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>

      {certification.credits ? (
        <p className="font-mono text-[0.6875rem] text-ink-600">{certification.credits}</p>
      ) : null}

      <p className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-400 transition-colors group-hover:text-signal-300">
        Verify on Credly
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </p>
    </article>
  )
}
