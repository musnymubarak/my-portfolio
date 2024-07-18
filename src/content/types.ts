/**
 * Shared content model for the portfolio.
 *
 * Every field here is populated from source documents supplied by the site
 * owner (resumes, an official Credly transcript, project briefs and LinkedIn
 * post screenshots). Optional fields exist so that content can be added later
 * without changing any component.
 */

export type SkillLevel = 'production' | 'working' | 'familiar'

export interface Skill {
  name: string
  /** How the skill has actually been used, per the source documents. */
  level: SkillLevel
}

export interface SkillGroup {
  id: string
  title: string
  /** One line describing what this group covers. */
  summary: string
  skills: Skill[]
}

export interface ExperienceRole {
  id: string
  company: string
  title: string
  start: string
  end: string | 'Present'
  /** ISO-8601 date used for sorting and structured data. */
  startISO: string
  endISO?: string
  location?: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  qualification: string
  start: string
  end: string
  startISO: string
  endISO: string
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'source' | 'appstore' | 'playstore' | 'other'
}

export interface ProjectScreenshot {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  orientation: 'landscape' | 'portrait'
}

export interface ProjectSection {
  heading: string
  /** Rendered as paragraphs. */
  body?: string[]
  /** Rendered as a bulleted list. */
  bullets?: string[]
  /** Rendered as a definition-style list, e.g. architecture layers. */
  rows?: { term: string; detail: string }[]
}

export interface Project {
  slug: string
  name: string
  /** One-line summary used on cards and in metadata. */
  tagline: string
  /** Two to three sentence overview used on the detail hero. */
  overview: string
  category: ProjectCategory
  industry?: string
  /** Client or organisation the work was delivered for, when stated. */
  client?: string
  /** Ordered, most significant first. Drives the filter chips. */
  technologies: string[]
  /** Longer-form case study sections. Only rendered when present. */
  sections: ProjectSection[]
  screenshots: ProjectScreenshot[]
  links: ProjectLink[]
  /** Controls ordering on the projects index; higher sorts first. */
  weight: number
  featured: boolean
  /** Accent colour sampled from the product's own branding. */
  accent: string
}

/**
 * The subset of a project needed to render a card. Client components receive
 * this rather than the full record, so case-study prose never ships in the
 * serialised payload.
 */
export type ProjectSummary = Pick<
  Project,
  'slug' | 'name' | 'tagline' | 'category' | 'technologies' | 'accent'
> & { cover?: ProjectScreenshot }

export type ProjectCategory =
  | 'Platform Engineering'
  | 'E-Commerce'
  | 'Enterprise System'
  | 'Product Engineering'
  | 'Product Website'

export interface Certification {
  id: string
  name: string
  issuer: string
  /** The organisation that authored the programme, when different from the issuer. */
  authorizedBy?: string
  issuedOn: string
  issuedOnISO: string
  /** Verbatim description from the official Credly transcript. */
  description: string
  credentialId: string
  credentialUrl: string
  skills: string[]
  /** ECTS credit recommendation carried on the transcript, when present. */
  credits?: string
  featured: boolean
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  /** Human-readable publication date, or a period when only that is known. */
  date: string
  dateISO: string
  /** True when the exact publication date was not recoverable from the source. */
  dateIsApproximate: boolean
  tags: string[]
  category: string
  readingMinutes: number
  featured: boolean
  /** Markdown-ish body rendered by the article renderer. */
  body: string
  /** Provenance note shown on the article so the reader knows the origin. */
  sourceNote: string
  sourceUrl?: string
}

export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: 'github' | 'linkedin' | 'credly' | 'fiverr' | 'mail'
}

export interface ResumeVariant {
  id: string
  label: string
  description: string
  file: string
  /** Approximate file size, shown so a visitor knows what they are downloading. */
  size: string
  updated: string
}
