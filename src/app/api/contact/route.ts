import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { profile } from '@/content/profile'

/**
 * Contact endpoint.
 *
 * Validates on the server, rate-limits per client address, and drops anything
 * that fills the honeypot field. If the mail provider is not configured the
 * route reports that plainly rather than pretending the message was sent — the
 * form then points the visitor at the direct email address.
 */

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.email('Please enter a valid email address.').max(200),
  subject: z.string().trim().min(3, 'Please add a subject.').max(160),
  message: z.string().trim().min(20, 'Please write at least 20 characters.').max(4000),
  // Honeypot. Any value is accepted by the schema so a bot cannot learn the
  // field is a trap from a validation error; the check happens after parsing.
  company: z.string().max(200).optional().default(''),
})

/**
 * Fixed-window rate limit held in module scope. This protects a single server
 * instance; a multi-instance deployment should move this to a shared store.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, { count: number; expires: number }>()

function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || entry.expires < now) {
    hits.set(key, { count: 1, expires: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  entry.count += 1
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.expires - now) / 1000) }
  }

  return { allowed: true, retryAfter: 0 }
}

/** Opportunistically drops expired entries so the map cannot grow unbounded. */
function sweep() {
  const now = Date.now()
  for (const [key, entry] of hits) {
    if (entry.expires < now) hits.delete(key)
  }
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

/** Escapes untrusted text before it is interpolated into the HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  if (hits.size > 500) sweep()

  const { allowed, retryAfter } = rateLimit(clientKey(request))
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many messages from this address. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return NextResponse.json(
      { error: firstIssue?.message ?? 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  const { name, email, subject, message, company } = parsed.data

  // Honeypot tripped: accept silently so the bot learns nothing.
  if (company.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toAddress = process.env.CONTACT_TO_EMAIL ?? profile.email
  const fromAddress = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromAddress) {
    return NextResponse.json(
      {
        error: 'The contact form is not configured on this deployment.',
        fallbackEmail: profile.email,
      },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `Portfolio enquiry — ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    })

    if (result.error) {
      console.error('Contact form send failed:', result.error)
      return NextResponse.json(
        { error: 'Could not send the message. Please email me directly.', fallbackEmail: profile.email },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email me directly.', fallbackEmail: profile.email },
      { status: 500 },
    )
  }
}
