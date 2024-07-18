'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

import type { ProjectScreenshot } from '@/content/types'
import { cn } from '@/lib/utils'

/**
 * Screenshot gallery with a lightbox.
 *
 * Landscape captures run the full width of the grid; phone captures sit four
 * to a row, so a project with both reads as two distinct surfaces rather than
 * a jumble. The lightbox is keyboard-driven and returns focus to the thumbnail
 * that opened it.
 */
export function ProjectGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggersRef.current[current]?.focus()
      return null
    })
  }, [])

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + direction + screenshots.length) % screenshots.length
      })
    },
    [screenshots.length],
  )

  useEffect(() => {
    if (openIndex === null) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      } else if (event.key === 'Tab') {
        // Only the controls are focusable, so keep Tab inside the overlay.
        event.preventDefault()
        closeRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openIndex, close, step])

  if (screenshots.length === 0) return null

  const active = openIndex !== null ? screenshots[openIndex] : undefined

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {screenshots.map((shot, index) => (
          <li
            key={shot.src}
            className={cn(
              shot.orientation === 'landscape' ? 'col-span-2 md:col-span-4' : 'col-span-1',
            )}
          >
            <figure className="group">
              <button
                type="button"
                ref={(element) => {
                  triggersRef.current[index] = element
                }}
                onClick={() => setOpenIndex(index)}
                className="relative block w-full overflow-hidden rounded-lg border border-[var(--hairline)] bg-base-850 transition-colors hover:border-[var(--hairline-strong)]"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  sizes={
                    shot.orientation === 'landscape'
                      ? '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px'
                      : '(max-width: 768px) 50vw, 260px'
                  }
                  className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.02]"
                />
                <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-[var(--hairline-strong)] bg-base-950/70 text-ink-200 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">Open larger view</span>
                </span>
              </button>

              <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-500">
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && openIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[80] flex flex-col bg-base-950/95 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] px-4 py-3 sm:px-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                {openIndex + 1} / {screenshots.length}
              </p>

              <div className="flex items-center gap-2">
                {screenshots.length > 1 ? (
                  <>
                    <LightboxButton onClick={() => step(-1)} label="Previous image">
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </LightboxButton>
                    <LightboxButton onClick={() => step(1)} label="Next image">
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </LightboxButton>
                  </>
                ) : null}
                <LightboxButton ref={closeRef} onClick={close} label="Close">
                  <X className="size-4" aria-hidden="true" />
                </LightboxButton>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                className="max-h-full w-auto max-w-full rounded-lg border border-[var(--hairline)] object-contain"
              />
            </div>

            <p className="border-t border-[var(--hairline)] px-4 py-4 text-center text-[0.8125rem] text-ink-400 sm:px-6">
              {active.caption}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function LightboxButton({
  ref,
  onClick,
  label,
  children,
}: {
  ref?: React.Ref<HTMLButtonElement>
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-[var(--hairline-strong)] text-ink-200 transition-colors hover:border-signal-400/50 hover:text-ink-50"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  )
}
