import Image from 'next/image'
import { ArrowDown, FileText } from 'lucide-react'

import { profile } from '@/content/profile'
import { ButtonLink } from '@/components/ui/button'
import { WordReveal, Reveal } from '@/components/motion/reveal'
import { ClusterBackdrop } from '@/components/three/cluster-backdrop'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <ClusterBackdrop eager className="pointer-events-none absolute inset-0 -z-10" />

      {/* Keeps headline contrast well clear of the WebGL field behind it. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-base-950/70 via-base-950/40 to-base-950"
        aria-hidden="true"
      />

      <div className="shell relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-16 sm:min-h-[calc(100dvh-4.5rem)] sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-2xl">
            {/* Compact identity for screens too narrow for the portrait card. */}
            <Reveal className="lg:hidden">
              <div className="mb-6 flex items-center gap-3.5">
                <Image
                  src="/images/profile/avatar.webp"
                  alt={`${profile.name}, ${profile.title}`}
                  width={874}
                  height={875}
                  priority
                  quality={90}
                  sizes="64px"
                  className="size-16 rounded-full border border-[var(--hairline-strong)] object-cover"
                />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">
                  {profile.location}
                </span>
              </div>
            </Reveal>

            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-base-900/70 py-1.5 pl-2.5 pr-4 backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span
                    className="absolute inline-flex size-full rounded-full bg-signal-400 motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-signal-400" />
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-300">
                  {profile.currentRole.title} at {profile.currentRole.company}
                </span>
              </p>
            </Reveal>

            <WordReveal
              as="h1"
              text={profile.name}
              delay={0.1}
              className="mt-7 text-[clamp(2.75rem,9vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-gradient"
            />

            <Reveal delay={0.35}>
              {/* The separator is bound to the preceding item so a wrapped line
                  ends with the slash rather than starting with one. */}
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-signal-300 sm:text-[0.8125rem]">
                {profile.disciplines.map((discipline, index) => (
                  <span key={discipline} className="inline-flex items-center gap-3">
                    {discipline}
                    {index < profile.disciplines.length - 1 ? (
                      <span className="text-ink-600" aria-hidden="true">
                        /
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl">
                {profile.positioning}
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/projects" size="lg" magnetic>
                  View selected work
                </ButtonLink>
                <ButtonLink href="/resume" variant="secondary" size="lg">
                  <FileText className="size-4" aria-hidden="true" />
                  Résumé
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in oklab, var(--color-signal-400) 16%, transparent), transparent 68%)',
                }}
                aria-hidden="true"
              />
              <Image
                src="/images/profile/portrait.webp"
                alt={`${profile.name}, ${profile.title}`}
                width={1254}
                height={1254}
                priority
                quality={90}
                sizes="320px"
                className="relative size-72 rounded-2xl border border-[var(--hairline-strong)] object-cover xl:size-80"
              />
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-[var(--hairline-strong)] bg-base-900/90 px-3.5 py-2 backdrop-blur-sm">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">
                  {profile.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.75} className="mt-16 hidden sm:block">
          <a
            href="#selected-work"
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-ink-200"
          >
            <ArrowDown className="size-3.5 motion-safe:animate-bounce" aria-hidden="true" />
            Selected work
          </a>
        </Reveal>
      </div>
    </section>
  )
}
