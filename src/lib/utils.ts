/** Joins class names, dropping anything falsy. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Clamps a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formats an ISO date for display. Used for precise dates only — approximate
 * blog dates carry their own human-written label instead.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

/** Turns "#2dd4a7" into "45, 212, 167" for use inside color-mix or rgb(). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const int = Number.parseInt(full, 16)
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`
}
