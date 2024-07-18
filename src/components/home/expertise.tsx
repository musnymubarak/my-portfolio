import { skillGroups, skillLevelLabel } from '@/content/skills'
import { Section, SectionHeader } from '@/components/ui/primitives'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const levelStyles: Record<string, string> = {
  production: 'border-signal-400/35 bg-signal-400/10 text-signal-200',
  working: 'border-[var(--hairline-strong)] bg-base-850 text-ink-300',
  familiar: 'border-transparent bg-base-800/70 text-ink-500',
}

export function Expertise() {
  return (
    <Section className="border-t border-[var(--hairline)]" ariaLabelledBy="expertise-heading">
      <SectionHeader
        eyebrow="Technical expertise"
        title={<span id="expertise-heading">The stack I actually run</span>}
        description="Grouped by what they are for, and marked by how they are evidenced — in production today, used substantially on a delivered project, or foundational."
      />

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
        {Object.entries(skillLevelLabel).map(([level, label]) => (
          <span key={level} className="inline-flex items-center gap-2">
            <span
              className={cn('size-2 rounded-full border', levelStyles[level])}
              aria-hidden="true"
            />
            {label}
          </span>
        ))}
      </div>

      <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <RevealItem key={group.id} index={index} className="flex flex-col gap-4 bg-base-900 p-6">
            <div>
              <h3 className="text-base font-semibold text-ink-100">{group.title}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">
                {group.summary}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem]',
                      levelStyles[skill.level],
                    )}
                    title={skillLevelLabel[skill.level]}
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
