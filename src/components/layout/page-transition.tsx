'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Page transition.
 *
 * A CSS animation keyed on the pathname, so each route plays a short rise and
 * fade as it mounts. There is deliberately no exit animation: holding the
 * outgoing page on screen adds latency to every navigation for no real gain.
 *
 * The animation lives in `.js .page-enter`, which means the content is never
 * hidden when JavaScript is unavailable, and the reduced-motion media query
 * disables it outright.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
