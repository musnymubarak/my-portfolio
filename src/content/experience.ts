import type { EducationEntry, ExperienceRole } from './types'

/**
 * Roles and education, taken from My_Resumes/Careed_Details.txt (September
 * 2026) and cross-checked against Mohamed_Musni_DevOps_CV.pdf. No employer,
 * title or date here is inferred — only these two roles are evidenced by the
 * source documents.
 */
export const experience: ExperienceRole[] = [
  {
    id: 'hashnate-junior-devops',
    company: 'Hashnate',
    title: 'Junior DevOps Engineer',
    start: 'Jul 2026',
    end: 'Present',
    startISO: '2026-07-01',
    summary:
      'Operating production Kubernetes infrastructure and the delivery pipelines that feed it, while also shipping application features into that same environment.',
    highlights: [
      'Operate several production Kubernetes clusters, deploying and reconciling workloads through ArgoCD GitOps across staging and production.',
      'Build and maintain GitLab CI/CD pipelines across backend services, frontend applications and Terraform IaC repositories — build, test, containerise, deploy.',
      'Author and maintain reusable Terraform modules so environments are provisioned identically and changes are reviewable in Git.',
      'Own end-to-end mobile release automation: pipelines that build and upload iOS builds to TestFlight and Android builds to Google Play Console on every push.',
      'Debug production issues across the application, pipeline and cluster layers, working directly with developers to shorten the feedback loop between commit and running code.',
      'Built a document intelligence and risk-analysis platform using retrieval-augmented generation and Google Gemini, with a custom machine-learning model for automated risk detection.',
      'Contributed to a blockchain-based contract drafting and storage system, developing components in Go for the blockchain environment.',
    ],
    stack: [
      'Kubernetes',
      'ArgoCD',
      'Terraform',
      'GitLab CI/CD',
      'Docker',
      'Go',
      'Python',
      'RAG',
      'Google Gemini',
    ],
  },
  {
    id: 'hashnate-devops-intern',
    company: 'Hashnate',
    title: 'DevOps Intern',
    start: 'Jan 2026',
    end: 'Jul 2026',
    startISO: '2026-01-01',
    endISO: '2026-07-01',
    summary:
      'Containerised the application estate and built the first generation of the delivery pipelines, including the mobile release path.',
    highlights: [
      'Containerised backend and frontend applications with Docker and developed CI/CD pipelines automating builds, testing, image creation and deployment across development and staging.',
      'Managed automated mobile release pipelines, handling iOS build configuration, signing and TestFlight distribution.',
      'Contributed to Android release automation and deployment workflows.',
      'Assisted in maintaining Kubernetes clusters and supported ArgoCD-based deployment workflows, gaining hands-on exposure to high-availability, multi-cluster operations.',
    ],
    stack: ['Docker', 'GitLab CI/CD', 'Kubernetes', 'ArgoCD', 'TestFlight', 'Google Play Console'],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'jaffna-bsc-it',
    institution: 'University of Jaffna',
    qualification: 'BSc (Hons) in Information Technology',
    start: 'Oct 2022',
    end: 'Jul 2026',
    startISO: '2022-10-01',
    endISO: '2026-07-01',
  },
]

/**
 * The engineering timeline shown on the about page. It interleaves employment
 * and study so the reader can see how the two overlapped.
 */
export const careerTimeline = [
  {
    period: 'Oct 2022',
    title: 'Started BSc (Hons) Information Technology',
    detail: 'University of Jaffna.',
    kind: 'education' as const,
  },
  {
    period: '2023 – 2025',
    title: 'Full-stack foundations',
    detail:
      'Built MERN applications end to end — an e-commerce platform, a hotel booking system and a peer-to-peer tutoring platform — each with its own admin dashboard.',
    kind: 'work' as const,
  },
  {
    period: '2024 – 2025',
    title: 'Moved toward infrastructure',
    detail:
      'Deployed a production POS application on Azure VMs, then self-hosted an n8n automation platform on Oracle Cloud with Prometheus and Grafana monitoring.',
    kind: 'work' as const,
  },
  {
    period: 'Jan 2026',
    title: 'Joined Hashnate as a DevOps Intern',
    detail:
      'Containerised the application estate and built the first CI/CD pipelines, including the iOS and Android release path.',
    kind: 'work' as const,
  },
  {
    period: 'Jul 2026',
    title: 'Graduated, and stepped up to Junior DevOps Engineer',
    detail:
      'Now operating production Kubernetes clusters through ArgoCD, authoring Terraform modules, and building backend services in Python and Go.',
    kind: 'work' as const,
  },
]
