'use client'

import { useSyncExternalStore } from 'react'

export type DeviceTier = 'mobile' | 'tablet' | 'desktop'

/** Scene budget per tier. Mobile gets a simplified scene, not a shrunken one. */
export const sceneBudget: Record<DeviceTier, { nodes: number; links: number; dpr: [number, number] }> =
  {
    mobile: { nodes: 220, links: 260, dpr: [1, 1.5] },
    tablet: { nodes: 480, links: 620, dpr: [1, 1.75] },
    desktop: { nodes: 820, links: 1150, dpr: [1, 2] },
  }

function resolveTier(): DeviceTier {
  const width = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches

  if (width < 768 || coarsePointer) return 'mobile'
  if (width < 1280 || cores <= 4 || memory <= 4) return 'tablet'
  return 'desktop'
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('resize', onChange, { passive: true })
  return () => window.removeEventListener('resize', onChange)
}

// useSyncExternalStore requires a referentially stable snapshot between reads,
// so the resolved tier is cached against the width it was computed for.
let cachedWidth = -1
let cachedTier: DeviceTier | null = null

function getSnapshot(): DeviceTier {
  if (window.innerWidth !== cachedWidth || cachedTier === null) {
    cachedWidth = window.innerWidth
    cachedTier = resolveTier()
  }
  return cachedTier
}

function getServerSnapshot(): null {
  return null
}

/**
 * Chooses how much 3D work the current device should be asked to do.
 *
 * The tier comes from viewport width, reported CPU concurrency and device
 * memory where the browser exposes them, so a large but underpowered device is
 * not handed the full desktop scene. It is null during server rendering and
 * the first client render, which lets callers avoid mounting anything heavy
 * before the device is known.
 */
export function useDeviceTier(): DeviceTier | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
