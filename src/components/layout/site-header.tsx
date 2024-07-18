'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { navigation, profile } from '@/content/profile'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

/** Drives the header's scrolled state without seeding it inside an effect. */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}
const isScrolled = () => window.scrollY > 12
const notScrolledOnServer = () => false

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, notScrolledOnServer)
  const prefersReducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the mobile panel whenever the route changes. Adjusting state during
  // render is the documented pattern for reacting to a changed prop; it avoids
  // the extra commit an effect would cost.
  const [panelPath, setPanelPath] = useState(pathname)
  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setOpen(false)
  }

  // Lock the page behind the open panel and restore focus on close.
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      // Trap focus inside the panel while it is open.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Move focus into the panel so a keyboard user lands somewhere useful.
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-[var(--hairline)] bg-base-950/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md"
          aria-label={`${profile.name} — home`}
        >
          <span
            className="grid size-8 place-items-center rounded-md border border-[var(--hairline-strong)] bg-base-850 font-mono text-[0.8125rem] font-semibold text-signal-300 transition-colors group-hover:border-signal-400/50"
            aria-hidden="true"
          >
            M
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink-100 sm:block">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors',
                      active ? 'text-ink-50' : 'text-ink-400 hover:text-ink-100',
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-[var(--hairline-strong)] bg-base-850"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <Link
            href="/contact"
            className="hidden h-9 items-center rounded-full bg-signal-400 px-4 text-[0.8125rem] font-medium text-base-950 transition-colors hover:bg-signal-300 lg:inline-flex"
          >
            Get in touch
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-ink-200 transition-colors hover:border-signal-400/50 hover:text-ink-50 lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <X className="size-4.5" aria-hidden="true" />
            ) : (
              <Menu className="size-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[var(--hairline)] bg-base-950/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="shell py-4">
              <ul className="flex flex-col">
                {navigation.map((item, index) => {
                  const active = isActive(item.href)
                  return (
                    <motion.li
                      key={item.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * index, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between border-b border-[var(--hairline)] py-3.5 text-base transition-colors',
                          active ? 'text-signal-300' : 'text-ink-300 hover:text-ink-50',
                        )}
                      >
                        {item.label}
                        <span className="font-mono text-[0.6875rem] text-ink-600">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              <Link
                href="/contact"
                className="mt-5 flex h-12 items-center justify-center rounded-full bg-signal-400 text-sm font-medium text-base-950"
              >
                Get in touch
              </Link>

              <div className="mt-5 flex items-center justify-between sm:hidden">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
