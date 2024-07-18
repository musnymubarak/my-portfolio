'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Drives every scroll reveal on the page.
 *
 * Mounted once in the root layout. On each navigation it re-scans for
 * `[data-reveal]` elements that have not yet been revealed, so a new route
 * animates without each component paying for its own observer.
 *
 * Two mechanisms work together, and both are necessary:
 *
 *   1. An IntersectionObserver handles the common case of a section scrolling
 *      into view, which is what produces the staggered entrance.
 *   2. A scroll and resize sweep catches sections a jump skipped over. An
 *      IntersectionObserver only fires when the intersection ratio crosses a
 *      threshold, so a scroll that moves a section from below the viewport to
 *      above it — browser scroll restoration on reload, an anchor link, Ctrl+End
 *      — produces no callback at all, and without the sweep that content would
 *      stay invisible.
 *
 * The sweep is throttled to one animation frame, and everything tears itself
 * down as soon as the last element has been revealed.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const pending = new Set(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'),
    )
    if (pending.size === 0) return

    // Bottom margin matches the CSS entrance so an element is not revealed
    // the instant its top edge appears.
    const ENTRY_MARGIN = 60

    let frame = 0
    let failsafe = 0
    let observer: IntersectionObserver | null = null

    const teardown = () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      if (failsafe) window.clearTimeout(failsafe)
    }

    const reveal = (element: HTMLElement) => {
      element.dataset['revealed'] = 'true'
      pending.delete(element)
      observer?.unobserve(element)
    }

    // Elements hidden at this breakpoint have no box and can never intersect.
    // Mark them now, so a resize that brings them into play finds them ready.
    for (const element of [...pending]) {
      if (element.getClientRects().length === 0) reveal(element)
    }

    const sweep = () => {
      frame = 0
      for (const element of [...pending]) {
        const rect = element.getBoundingClientRect()
        const scrolledPast = rect.bottom <= 0
        const enteredView = rect.top < window.innerHeight - ENTRY_MARGIN
        if (scrolledPast || enteredView) reveal(element)
      }
      if (pending.size === 0) teardown()
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep)
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement)
          }
          if (pending.size === 0) teardown()
        },
        { rootMargin: `0px 0px -${ENTRY_MARGIN}px 0px`, threshold: 0.01 },
      )
      for (const element of pending) observer.observe(element)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Runs once up front so a restored scroll position is handled on load.
    sweep()

    // Last resort. If anything is still hidden after a few seconds, show it
    // rather than leave content permanently invisible.
    if (pending.size > 0) {
      failsafe = window.setTimeout(() => {
        for (const element of [...pending]) reveal(element)
      }, 4000)
    }

    return teardown
  }, [pathname])

  return null
}
