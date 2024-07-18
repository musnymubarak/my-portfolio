import type { ResumeVariant, SocialLink } from './types'

/**
 * Identity and positioning.
 *
 * The positioning below is derived from the professional summary in the most
 * recent source resume (My_Resumes/Careed_Details.txt, September 2026) rather
 * than invented: "Software engineer who builds production backend services and
 * runs the infrastructure they deploy to."
 *
 * Deliberately not published here, although present in the source documents:
 * the personal phone number, the date of birth carried on the Credly
 * transcript, and the private email addresses of the two academic referees.
 */
export const profile = {
  /** Legal name, as it appears on the official Credly transcript. */
  legalName: 'Mohamed Musni Mohamed Mubarak',
  /** The name used professionally and across public profiles. */
  name: 'Mohamed Musni',
  shortName: 'Musny',
  title: 'Software Engineer',
  /** The three disciplines the source material actually evidences. */
  disciplines: ['Backend Systems', 'Cloud Infrastructure', 'DevOps'],
  /** One line. Used in the hero, metadata and the Open Graph card. */
  positioning: 'I build production backend services, and run the infrastructure they deploy to.',
  location: 'Sri Lanka',
  email: 'musnymohammed@gmail.com',
  currentRole: {
    title: 'Junior DevOps Engineer',
    company: 'Hashnate',
    since: 'July 2026',
  },
  /**
   * Long-form summary, condensed from the September 2026 resume. Every claim
   * traces back to that document.
   */
  summary: [
    'I am a software engineer working across the line that usually divides application code from the infrastructure it runs on. On one side I write REST APIs in Python with FastAPI and in Node.js with TypeScript, and build React and Next.js interfaces against them. On the other I operate several production Kubernetes clusters, reconcile them through ArgoCD, provision environments with Terraform, and maintain the GitLab CI/CD pipelines that connect the two.',
    'That means I can take a feature from API design through tests, container build, pipeline, deployment and production debugging without handing it over at a boundary. It also means when something breaks at 2am, I can read the stack trace, the pipeline log and the cluster events as one problem rather than three.',
    'Alongside that, I have delivered production web platforms for clients across healthcare, marine tourism, education, export trade, architecture and non-profit sectors, and I pick up unfamiliar languages and platforms quickly when a project needs it.',
  ],
  /** Short bio used where only a sentence or two fits. */
  shortBio:
    'Software engineer at Hashnate building production backend services in Python and TypeScript, and operating the Kubernetes, Terraform and GitLab CI/CD infrastructure they deploy to.',
} as const

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/musnymubarak',
    handle: 'musnymubarak',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/musny-mubarak/',
    handle: 'musny-mubarak',
    icon: 'linkedin',
  },
  {
    label: 'Credly',
    href: 'https://www.credly.com/users/mohamed-musni',
    handle: 'mohamed-musni',
    icon: 'credly',
  },
  {
    label: 'Fiverr',
    href: 'https://www.fiverr.com/users/musny_mubarak/',
    handle: 'musny_mubarak',
    icon: 'fiverr',
  },
]

/**
 * Three resume variants are published because the source folder contains
 * genuinely different documents aimed at different roles. The remaining files
 * in My_Resumes are older revisions of the same three and are not published.
 */
export const resumeVariants: ResumeVariant[] = [
  {
    id: 'devops',
    label: 'DevOps & Cloud Engineer',
    description:
      'Leads with Kubernetes, Terraform, ArgoCD and GitLab CI/CD, plus the mobile release automation and monitoring work. The most current document.',
    file: '/resume/Mohamed-Musni-DevOps-Engineer-CV.pdf',
    size: '297 KB',
    updated: 'September 2026',
  },
  {
    id: 'software-engineer',
    label: 'Software Engineer',
    description:
      'Backend-weighted: Java and Spring Boot, .NET Core, Node.js and REST API design, with the university project work.',
    file: '/resume/Mohamed-Musni-Software-Engineer-CV.pdf',
    size: '298 KB',
    updated: 'July 2025',
  },
  {
    id: 'full-stack',
    label: 'Full-Stack Developer',
    description:
      'Covers the full MERN surface including the admin dashboards, testing tooling and the frontend stack in more depth.',
    file: '/resume/Mohamed-Musni-Full-Stack-CV.pdf',
    size: '220 KB',
    updated: 'April 2025',
  },
]

export const siteConfig = {
  name: `${profile.name} — ${profile.title}`,
  shortName: profile.name,
  description: profile.positioning,
  /**
   * Update this to the production domain before deploying. It is the single
   * source of truth for canonical URLs, the sitemap and Open Graph tags.
   */
  url: 'https://musny.netlify.app',
  ogImage: '/opengraph-image',
  locale: 'en_GB',
} as const

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Blog', href: '/blog' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const
