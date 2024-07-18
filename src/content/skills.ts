import type { SkillGroup } from './types'

/**
 * Technical skills, grouped as they are in the September 2026 resume.
 *
 * `level` is not a self-assessment score. It records how the skill is
 * evidenced in the source material:
 *   production — used in the current production environment or a shipped product
 *   working    — used substantially in a delivered project
 *   familiar   — evidenced by certification or supporting project work only
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure & Orchestration',
    summary: 'Where workloads actually run, and how they get there.',
    skills: [
      { name: 'Kubernetes', level: 'production' },
      { name: 'Docker', level: 'production' },
      { name: 'ArgoCD (GitOps)', level: 'production' },
      { name: 'Linux / Ubuntu administration', level: 'production' },
      { name: 'Nginx', level: 'production' },
      { name: 'Microsoft Azure', level: 'working' },
      { name: 'Oracle Cloud Infrastructure', level: 'working' },
      { name: 'AWS', level: 'working' },
    ],
  },
  {
    id: 'cicd',
    title: 'CI/CD & Infrastructure as Code',
    summary: 'The path from a commit to a running deployment.',
    skills: [
      { name: 'GitLab CI/CD', level: 'production' },
      { name: 'Terraform', level: 'production' },
      { name: 'GitHub Actions', level: 'working' },
      { name: 'Mobile release automation', level: 'production' },
      { name: 'TestFlight', level: 'production' },
      { name: 'Google Play Console', level: 'production' },
      { name: 'Docker Compose', level: 'production' },
      { name: 'Jenkins', level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    summary: 'Services, APIs and the contracts between them.',
    skills: [
      { name: 'Python', level: 'production' },
      { name: 'FastAPI', level: 'production' },
      { name: 'Node.js', level: 'production' },
      { name: 'TypeScript', level: 'production' },
      { name: 'Express.js', level: 'production' },
      { name: 'REST API design', level: 'production' },
      { name: 'Microservices', level: 'working' },
      { name: 'Go', level: 'working' },
      { name: 'Java / Spring Boot', level: 'working' },
      { name: '.NET Core / C#', level: 'working' },
      { name: 'Celery', level: 'working' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Product',
    summary: 'Interfaces built against those services.',
    skills: [
      { name: 'React', level: 'production' },
      { name: 'Next.js', level: 'production' },
      { name: 'TypeScript', level: 'production' },
      { name: 'Tailwind CSS', level: 'production' },
      { name: 'JavaScript', level: 'production' },
      { name: 'Framer Motion', level: 'working' },
      { name: 'React Query', level: 'working' },
      { name: 'Flutter / Dart', level: 'working' },
      { name: 'UX design process', level: 'working' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Storage',
    summary: 'Relational modelling, caching and queues.',
    skills: [
      { name: 'PostgreSQL', level: 'production' },
      { name: 'Redis', level: 'production' },
      { name: 'MongoDB', level: 'working' },
      { name: 'MySQL / MariaDB', level: 'working' },
      { name: 'Prisma ORM', level: 'working' },
      { name: 'SQLAlchemy', level: 'working' },
    ],
  },
  {
    id: 'observability',
    title: 'Observability & Debugging',
    summary: 'Knowing what production is doing, and why it stopped.',
    skills: [
      { name: 'Prometheus', level: 'production' },
      { name: 'Grafana', level: 'production' },
      { name: 'Log-driven production debugging', level: 'production' },
      { name: 'Git', level: 'production' },
      { name: 'Postman', level: 'working' },
    ],
  },
]

/**
 * The short list shown in the home page expertise section — the technologies
 * the current role and the strongest projects actually run on.
 */
export const coreStack = [
  'Kubernetes',
  'Terraform',
  'ArgoCD',
  'GitLab CI/CD',
  'Docker',
  'Python',
  'FastAPI',
  'TypeScript',
  'Node.js',
  'React',
  'Next.js',
  'PostgreSQL',
  'Redis',
  'Go',
  'Prometheus',
  'Grafana',
] as const

export const skillLevelLabel: Record<string, string> = {
  production: 'In production',
  working: 'Project experience',
  familiar: 'Foundational',
}
