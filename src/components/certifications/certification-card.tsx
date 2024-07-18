import { ExternalLink } from 'lucide-react'

import type { Certification } from '@/content/types'
import { displayIssuer } from '@/content/certifications'
import { Badge } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

/** Colour-codes the issuing organisation so the wall scans quickly. */
const issuerAccent: Record<string, string> = {
  IBM: '#4d8ff0',
  Meta: '#8b7ef0',
  Google: '#f5b544',
  Cisco: '#3fb0d6',
  Coursera: '#4d8ff0',
  'Amazon Web Services Training and Certification': '#f5a524',
}

export function CertificationCard({
  certification,
  className,
}: {
  certification: Certification
  className?: string
}) {
  const org = certification.authorizedBy ?? certification.issuer
  const accent = issuerAccent[org] ?? '#2dd4a7'

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border border-[var(--hairline)] bg-base-900 p-5 transition-colors duration-300 hover:border-[var(--hairline-strong)] sm:p-6',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="size-2 shrink-0 rounded-full" style={{ background: accent }} aria-hidden="true" />
          <span className="truncate font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">
            {displayIssuer(org)}
          </span>
        </div>
        <time
          dateTime={certification.issuedOnISO}
          className="shrink-0 font-mono text-[0.6875rem] text-ink-600"
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
