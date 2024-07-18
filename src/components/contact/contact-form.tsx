'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string; fallbackEmail?: string }

const fieldClass =
  'w-full rounded-lg border border-[var(--hairline-strong)] bg-base-900 px-4 py-3 text-[0.9375rem] text-ink-100 outline-none transition-colors placeholder:text-ink-600 focus:border-signal-400/60'

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    setStatus({ kind: 'sending' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const body = (await response.json().catch(() => ({}))) as {
        error?: string
        fallbackEmail?: string
      }

      if (!response.ok) {
        setStatus({
          kind: 'error',
          message: body.error ?? 'Could not send the message.',
          ...(body.fallbackEmail ? { fallbackEmail: body.fallbackEmail } : {}),
        })
        return
      }

      form.reset()
      setStatus({ kind: 'sent' })
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network problem. Please check your connection or email me directly.',
        fallbackEmail,
      })
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="rounded-xl border border-signal-400/30 bg-signal-400/[0.07] p-8 text-center">
        <CheckCircle2 className="mx-auto size-8 text-signal-400" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-ink-100">Message sent</h3>
        <p className="mt-2 text-[0.9375rem] text-ink-400">
          Thanks for getting in touch. I will reply to the address you gave.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="mt-5 text-sm text-signal-300 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot. Hidden from sight and from assistive technology. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" required disabled={sending} />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          disabled={sending}
        />
      </div>

      <Field id="subject" label="Subject" required disabled={sending} />

      <div>
        <label htmlFor="message" className="mb-2 block text-[0.8125rem] font-medium text-ink-300">
          Message <span className="text-ink-600">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={20}
          maxLength={4000}
          disabled={sending}
          placeholder="What are you building, and what do you need?"
          className={cn(fieldClass, 'resize-y')}
        />
      </div>

      {status.kind === 'error' ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/[0.07] p-4"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden="true" />
          <p className="text-[0.875rem] leading-relaxed text-ink-300">
            {status.message}{' '}
            {status.fallbackEmail ? (
              <a
                href={`mailto:${status.fallbackEmail}`}
                className="text-signal-300 underline underline-offset-4"
              >
                {status.fallbackEmail}
              </a>
            ) : null}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <Button type="submit" size="lg" disabled={sending} magnetic>
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
        <p className="min-w-0 break-all text-[0.75rem] text-ink-600">
          Replies come from {fallbackEmail}
        </p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  type = 'text',
  required,
  disabled,
  autoComplete,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.8125rem] font-medium text-ink-300">
        {label} {required ? <span className="text-ink-600">(required)</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  )
}
