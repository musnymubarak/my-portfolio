'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

import { LinkedinIcon } from '@/components/ui/brand-icons'

/** Whether the browser offers a native share sheet. Never changes at runtime. */
const noopSubscribe = () => () => {}
const shareSupported = () => typeof navigator.share === 'function'
const shareUnsupportedOnServer = () => false

/**
 * Share controls. Uses the native share sheet where the browser offers one,
 * and always keeps a copy-link button and a direct LinkedIn link as fallbacks.
 */
export function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)
  const canShare = useSyncExternalStore(
    noopSubscribe,
    shareSupported,
    shareUnsupportedOnServer,
  )

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard access can be denied; the LinkedIn link still works.
      setCopied(false)
    }
  }

  const share = async () => {
    try {
      await navigator.share({ title, url })
    } catch {
      // The user dismissed the sheet, or sharing is unavailable. Nothing to do.
    }
  }

  const buttonClass =
    'inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-4 py-2 text-[0.8125rem] text-ink-300 transition-colors hover:border-signal-400/50 hover:text-ink-50'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600">
        Share
      </span>

      {canShare ? (
        <button type="button" onClick={share} className={buttonClass}>
          <Share2 className="size-3.5" aria-hidden="true" />
          Share
        </button>
      ) : null}

      <button type="button" onClick={copy} className={buttonClass}>
        {copied ? (
          <Check className="size-3.5 text-signal-400" aria-hidden="true" />
        ) : (
          <Link2 className="size-3.5" aria-hidden="true" />
        )}
        {copied ? 'Link copied' : 'Copy link'}
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <LinkedinIcon className="size-3.5" />
        LinkedIn
      </a>
    </div>
  )
}
