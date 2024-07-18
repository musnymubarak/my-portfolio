'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { useDeviceTier } from '@/lib/hooks/use-device-tier'

/**
 * Decorative backdrop.
 *
 * Renders a static CSS field immediately, and only then considers pulling in
 * the WebGL bundle. The static field is not a loading state — it is a finished
 * visual in the same design language, so a visitor who never gets WebGL still
 * sees a complete page.
 *
 * The three.js chunk is roughly 230 KB gzipped. It is always dynamically
 * imported, never blocks first paint, and is served with a one-year immutable
 * cache, so it is paid for once per visitor. On inner pages, where the
 * backdrop is a narrow decorative strip rather than the main event, phones
 * skip it entirely.
 */
const ClusterCanvas = dynamic(() => import('./cluster-canvas'), { ssr: false })

interface ClusterBackdropProps {
  /** Load as soon as the page settles rather than waiting for intersection. */
  eager?: boolean
  /** Skip WebGL on phones — used by the inner-page header. */
  desktopOnly?: boolean
  className?: string
}

export function ClusterBackdrop({
  eager = false,
  desktopOnly = false,
  className,
}: ClusterBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const tier = useDeviceTier()

  useEffect(() => {
    if (eager) {
      // Defer past first paint so the canvas never competes with LCP.
      const id = window.setTimeout(() => setInView(true), 120)
      return () => window.clearTimeout(id)
    }

    const element = containerRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [eager])

  const allowedOnThisDevice = !desktopOnly || (tier !== null && tier !== 'mobile')
  const shouldRenderCanvas = inView && allowedOnThisDevice

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      aria-hidden="true"
      // The scene carries no information; content never depends on it.
      role="presentation"
    >
      <StaticField />
      {shouldRenderCanvas ? (
        <div className="absolute inset-0 motion-safe:animate-[fade-in_900ms_ease-out_both]">
          <ClusterCanvas />
        </div>
      ) : null}
    </div>
  )
}

/**
 * Pure-CSS stand-in for the cluster: a soft radial core over a hairline grid.
 * Costs nothing and shares the palette of the WebGL scene.
 */
function StaticField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="grid-field absolute inset-0 opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 10%, transparent 75%)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-signal-400) 13%, transparent) 0%, transparent 62%)',
        }}
      />
    </div>
  )
}
