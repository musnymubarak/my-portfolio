'use client'

import { useSyncExternalStore } from 'react'

export type ThemeMode = 'light' | 'dark'

/**
 * The theme actually in effect, after resolving an explicit choice against the
 * operating system preference.
 *
 * CSS handles theming on its own through `light-dark()`, so this exists only
 * for the WebGL scene, which cannot read CSS custom properties and has to pick
 * its blending mode and palette in JavaScript.
 */
function resolve(): ThemeMode {
  const explicit = document.documentElement.getAttribute('data-theme')
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  query.addEventListener('change', onChange)

  // The toggle writes data-theme on <html>, which fires no event of its own.
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  return () => {
    query.removeEventListener('change', onChange)
    observer.disconnect()
  }
}

// useSyncExternalStore needs a stable snapshot between reads, and the resolved
// mode is a primitive, so returning it directly is safe.
function getServerSnapshot(): ThemeMode {
  return 'dark'
}

export function useThemeMode(): ThemeMode {
  return useSyncExternalStore(subscribe, resolve, getServerSnapshot)
}
