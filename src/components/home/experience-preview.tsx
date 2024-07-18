import { experience, education } from '@/content/experience'
import { Badge, Section, SectionHeader } from '@/components/ui/primitives'
import { Reveal } from '@/components/motion/reveal'

export function ExperiencePreview() {
  return (
    <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="experience-heading">
      <SectionHeader
        eyebrow="Experience"
        title={<span id="experience-heading">Where I have been doing it</span>}
        action={{ label: 'Full résumé', href: '/resume' }}
      />

      <ol className="mt-12 space-y-0">
        {experience.map((role, index) => (
          <Reveal as="li" key={role.id} delay={index * 0.08}>
            <article className="group relative grid gap-6 border-t border-[var(--hairline)] py-8 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-10 md:py-10">
              <div className="flex items-start gap-3 md:flex-col md:gap-2">
                <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-400">
                  {role.start} — {role.end}
                </p>
                {role.end === 'Present' ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-signal-300">
                    <span className="size-1.5 rounded-full bg-signal-400" aria-hidden="true" />
                    Current
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-ink-100">
                  {role.title}
                  <span className="text-ink-500"> · {role.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-400">
                  {role.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {role.highlights.slice(0, 4).map((highlight) => (
                    <li
                      key={highlight}
                      className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-300"
                    >
                      <span
                        className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-signal-400/70"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {education.map((entry) => (
          <Reveal as="li" key={entry.id}>
            <article className="grid gap-6 border-y border-[var(--hairline)] py-8 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-10">
              <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-400">
                {entry.start} — {entry.end}
              </p>
              <div>
                <h3 className="text-xl font-semibold text-ink-100">
                  {entry.qualification}
                  <span className="text-ink-500"> · {entry.institution}</span>
                </h3>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
