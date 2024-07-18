'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ThemePreference = 'system' | 'light' | 'dark'

export const THEME_STORAGE_KEY = 'musny-theme'

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'dark', label: 'Dark', Icon: Moon },
]

/**
 * The current preference, read from the DOM rather than from storage.
 *
 * The pre-paint script in the layout has already applied any saved choice to
 * `data-theme`, so the attribute is the single source of truth and no effect
 * is needed to catch up with it.
 */
function getPreference(): ThemePreference {
  const attribute = document.documentElement.getAttribute('data-theme')
  return attribute === 'light' || attribute === 'dark' ? attribute : 'system'
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

function getServerPreference(): ThemePreference {
  return 'system'
}

/**
 * Theme control.
 *
 * "System" is the default and needs no JavaScript at all: the stylesheet
 * resolves it through `color-scheme` and `light-dark()`. Only an explicit
 * choice is persisted.
 *
 * Rendered as a radio group rather than a two-state toggle, because a toggle
 * cannot express "follow my system", and losing that is a real regression for
 * anyone who schedules dark mode by time of day.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const preference = useSyncExternalStore(subscribe, getPreference, getServerPreference)

  const apply = useCallback((next: ThemePreference) => {
    const root = document.documentElement

    if (next === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', next)
    }

    try {
      if (next === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY)
      else window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage is unavailable in some private modes. The attribute is already
      // set, so the choice still applies for this visit.
    }
  }, [])

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-raised)] p-0.5',
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = preference === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            onClick={() => apply(value)}
            className={cn(
              'inline-flex size-7 items-center justify-center rounded-full transition-colors duration-200',
              active ? 'bg-signal-400/15 text-signal-300' : 'text-ink-500 hover:text-ink-100',
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
