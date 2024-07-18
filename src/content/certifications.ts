import type { Certification } from './types'

/**
 * Sourced verbatim from the official Credly transcript issued 3 September 2026
 * (Certfication/Certificate _Details.pdf). Credential URLs were recovered from
 * the hyperlink table embedded in that same PDF, and cross-checked against the
 * badge links embedded in the resumes.
 */
const credly = (id: string) => `https://www.credly.com/badges/${id}/public_url`

export const certifications: Certification[] = [
  {
    id: '095ef3fa-e5ac-492a-acca-a3753e04812c',
    name: 'Meta Full-Stack Engineer Certificate',
    issuer: 'Coursera',
    authorizedBy: 'Meta',
    issuedOn: '10 October 2024',
    issuedOnISO: '2024-10-10',
    description:
      'Awarded to learners who complete both the Front-End and Back-End Developer certificate programs. These rigorous, self-paced courses, developed by Meta experts, prepare a candidate for an entry level job as a full-stack developer, and culminate in the successful completion of capstone projects.',
    credentialId: '095ef3fa-e5ac-492a-acca-a3753e04812c',
    credentialUrl: credly('095ef3fa-e5ac-492a-acca-a3753e04812c'),
    skills: ['React', 'Python', 'Full-Stack Development', 'REST APIs'],
    featured: true,
  },
  {
    id: 'ac5e9c82-4aab-4dbd-b4e9-51178e73dadf',
    name: 'Containers & Kubernetes Essentials',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '11 June 2025',
    issuedOnISO: '2025-06-11',
    description:
      'The badge earner is able to build and run a container image and understands Kubernetes architecture. They know how to write a YAML deployment file, expose a deployment as a service, manage applications with Kubernetes, use ReplicaSets, auto-scaling, rolling updates and service binding, and deploy services.',
    credentialId: 'ac5e9c82-4aab-4dbd-b4e9-51178e73dadf',
    credentialUrl: credly('ac5e9c82-4aab-4dbd-b4e9-51178e73dadf'),
    skills: ['Kubernetes', 'Containers', 'YAML', 'Auto-scaling', 'OpenShift'],
    featured: true,
  },
  {
    id: 'f56940f9-a965-4715-a0da-bf95117206e4',
    name: 'Continuous Integration & Continuous Delivery (CI/CD)',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '1 August 2025',
    issuedOnISO: '2025-08-01',
    description:
      'The badge earner can define a CI/CD pipeline and standard CD tools. They can build a pipeline, pass parameters to a pipeline, build triggers to start pipeline runs, implement reusable tasks, and create custom tasks. They understand how to complete a CD pipeline by building a container image and deploying an application to an OpenShift Kubernetes cluster using OpenShift Pipelines and GitOps tools like ArgoCD.',
    credentialId: 'f56940f9-a965-4715-a0da-bf95117206e4',
    credentialUrl: credly('f56940f9-a965-4715-a0da-bf95117206e4'),
    skills: ['CI/CD', 'ArgoCD', 'GitOps', 'Tekton', 'Kubernetes'],
    featured: true,
  },
  {
    id: '15c7ecb2-53ea-4b62-899f-1a862e8862ab',
    name: 'Application Development using Microservices and Serverless',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '14 August 2025',
    issuedOnISO: '2025-08-14',
    description:
      'The badge earner understands the concept of twelve-factor apps and microservices and how they relate to the software delivery lifecycle. The learner has demonstrated proficiency in creating and testing Swagger documentation for REST API endpoints, can make API requests using cURL and Postman, can create a serverless function, and can build and deploy applications using container images.',
    credentialId: '15c7ecb2-53ea-4b62-899f-1a862e8862ab',
    credentialUrl: credly('15c7ecb2-53ea-4b62-899f-1a862e8862ab'),
    skills: ['Microservices', 'Serverless', 'Twelve-Factor Apps', 'OpenAPI', 'REST APIs'],
    featured: true,
  },
  {
    id: '68509de6-a65b-48ab-abc3-ecb783f53b08',
    name: 'DevOps Essentials',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 April 2025',
    issuedOnISO: '2025-04-23',
    description:
      'This credential earner has demonstrated foundational knowledge of the basic characteristics of DevOps. The individual has explored the concepts of breaking down silos and how to organize developers and operators into a single cross-functional DevOps team, and is able to describe DevOps as a cultural movement as well as develop a business case for DevOps.',
    credentialId: '68509de6-a65b-48ab-abc3-ecb783f53b08',
    credentialUrl: credly('68509de6-a65b-48ab-abc3-ecb783f53b08'),
    skills: ['DevOps', 'Cross-Functional Teams', 'Delivery Culture'],
    featured: true,
  },
  {
    id: '8d638513-302f-4dea-b766-bf2cc05413f0',
    name: 'AWS Educate Introduction to Cloud 101',
    issuer: 'Amazon Web Services Training and Certification',
    issuedOn: '18 March 2025',
    issuedOnISO: '2025-03-18',
    description:
      'Earners of this badge have completed the Cloud Computing 101 training and achieved the required scores on the post-course assessment. They have demonstrated the ability to create simple cloud applications in a virtual lab environment, and show a fundamental understanding of AWS cloud core services.',
    credentialId: '8d638513-302f-4dea-b766-bf2cc05413f0',
    credentialUrl: credly('8d638513-302f-4dea-b766-bf2cc05413f0'),
    skills: ['AWS', 'Cloud Computing', 'Cloud Core Services'],
    featured: true,
  },
  {
    id: '259dbf1b-38e9-4b98-9b09-702c6db3bbad',
    name: 'AWS SimuLearn — Cloud Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issuedOn: '27 March 2025',
    issuedOnISO: '2025-03-27',
    description:
      'Earners of this badge have demonstrated basic solution building knowledge using AWS services and have a fundamental understanding of AWS Cloud concepts. Badge earners have acquired hands-on experience with compute, networking, database and security services.',
    credentialId: '259dbf1b-38e9-4b98-9b09-702c6db3bbad',
    credentialUrl: credly('259dbf1b-38e9-4b98-9b09-702c6db3bbad'),
    skills: ['AWS', 'Compute', 'Networking', 'Cloud Security'],
    featured: false,
  },
  {
    id: '3acb903e-59ba-409c-a9b8-f55faafd0d69',
    name: 'Introduction to Cloud Computing',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '20 May 2025',
    issuedOnISO: '2025-05-20',
    description:
      'The badge earner understands the basics of cloud technology and is able to describe cloud platforms and models including IaaS, PaaS, SaaS, and public, private and hybrid multiclouds. The badge earner is familiar with essentials of cloud applications and terms like virtualization, VMs, containers, object storage, microservices, serverless, cloud native and DevOps.',
    credentialId: '3acb903e-59ba-409c-a9b8-f55faafd0d69',
    credentialUrl: credly('3acb903e-59ba-409c-a9b8-f55faafd0d69'),
    skills: ['Cloud Computing', 'IaaS / PaaS / SaaS', 'Virtualisation', 'Cloud Native'],
    featured: false,
  },
  {
    id: 'affcb77e-56d3-4846-8825-cd70b07a1a8e',
    name: 'Linux Commands & Shell Scripting Essentials V2',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'This badge earner has demonstrated a foundational knowledge of Linux commands and shell scripting. The individual can perform general-purpose, directory management, file management, access control and networking commands, and has hands-on experience creating simple and advanced shell scripts and scheduling cron jobs using crontab.',
    credentialId: 'affcb77e-56d3-4846-8825-cd70b07a1a8e',
    credentialUrl: credly('affcb77e-56d3-4846-8825-cd70b07a1a8e'),
    skills: ['Linux', 'Shell Scripting', 'Bash', 'cron'],
    featured: true,
  },
  {
    id: 'a52a6278-12b8-441c-ab05-d6ec0fc68b87',
    name: 'Applied Software Engineering Fundamentals',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'This credential earner has demonstrated an understanding of software engineering foundations. They can describe the phases, roles and tools used to develop, test and deploy software, explain version control, create GitHub repositories and use Git commands, execute common Linux commands, create simple shell scripts, and develop applications using Python and APIs.',
    credentialId: 'a52a6278-12b8-441c-ab05-d6ec0fc68b87',
    credentialUrl: credly('a52a6278-12b8-441c-ab05-d6ec0fc68b87'),
    skills: ['Software Engineering', 'Git', 'Linux', 'Python', 'APIs'],
    featured: true,
  },
  {
    id: '7e8c6a39-0c55-4ec6-a1e3-effd18c069f2',
    name: 'Meta Front-End Developer Certificate',
    issuer: 'Coursera',
    authorizedBy: 'Meta',
    issuedOn: '11 September 2024',
    issuedOnISO: '2024-09-11',
    description:
      'Awarded to learners who complete a series of courses on front-end web development. With a focus on React.js, these rigorous, self-paced courses, developed by Meta experts, prepare a candidate for an entry level job as a front-end developer, and culminate in the successful completion of a capstone project.',
    credentialId: '7e8c6a39-0c55-4ec6-a1e3-effd18c069f2',
    credentialUrl: credly('7e8c6a39-0c55-4ec6-a1e3-effd18c069f2'),
    skills: ['React', 'JavaScript', 'HTML & CSS', 'UI Development'],
    credits: '8 ECTS recommended (FIBAA)',
    featured: false,
  },
  {
    id: '5a799576-cd4e-4822-9b84-177eb641ab56',
    name: 'Meta Back-End Developer Certificate',
    issuer: 'Coursera',
    authorizedBy: 'Meta',
    issuedOn: '25 September 2024',
    issuedOnISO: '2024-09-25',
    description:
      'Awarded to learners who complete a series of courses on back-end development. With a focus on Python, these rigorous, self-paced courses, developed by Meta experts, prepare a candidate for an entry level job as a back-end developer, and culminate in the successful completion of a capstone project.',
    credentialId: '5a799576-cd4e-4822-9b84-177eb641ab56',
    credentialUrl: credly('5a799576-cd4e-4822-9b84-177eb641ab56'),
    skills: ['Python', 'Django', 'REST APIs', 'Databases'],
    credits: '8 ECTS recommended (FIBAA)',
    featured: false,
  },
  {
    id: 'b36be34e-0835-491b-babf-0819a5b14c3e',
    name: 'Python Project for AI and Application Development',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'This badge earner is able to apply foundational Python skills by implementing different techniques to develop applications and AI powered solutions. The individual has acquired the confidence to begin developing AI enabled applications using Python, build and run unit tests, and package the application for distribution.',
    credentialId: 'b36be34e-0835-491b-babf-0819a5b14c3e',
    credentialUrl: credly('b36be34e-0835-491b-babf-0819a5b14c3e'),
    skills: ['Python', 'AI Applications', 'Unit Testing', 'Packaging'],
    featured: false,
  },
  {
    id: '637cae9c-7471-44a6-9e5b-d4112cdc80f5',
    name: 'Python for Data Science and AI',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'This badge earner has the core skills in Python such as critical data structures, programming fundamentals and experience with core libraries for data science. They can apply this knowledge to work with data and develop applications for data science.',
    credentialId: '637cae9c-7471-44a6-9e5b-d4112cdc80f5',
    credentialUrl: credly('637cae9c-7471-44a6-9e5b-d4112cdc80f5'),
    skills: ['Python', 'Data Structures', 'Data Science Libraries'],
    featured: false,
  },
  {
    id: '0556a515-085d-40cb-a159-5bdf1e97b56b',
    name: 'Git and GitHub Essentials',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'This badge earner has demonstrated how to use Git and GitHub as code repositories for developing applications. The badge earner can create repositories and branches, perform pull requests and merge operations, and use these repositories to collaborate with their teammates.',
    credentialId: '0556a515-085d-40cb-a159-5bdf1e97b56b',
    credentialUrl: credly('0556a515-085d-40cb-a159-5bdf1e97b56b'),
    skills: ['Git', 'GitHub', 'Version Control', 'Code Review'],
    featured: false,
  },
  {
    id: '743ece5b-ae30-4d04-82b4-940b3b70e853',
    name: 'Software Engineering Essentials',
    issuer: 'Coursera',
    authorizedBy: 'IBM',
    issuedOn: '23 October 2024',
    issuedOnISO: '2024-10-23',
    description:
      'The badge earner has demonstrated an understanding of the software development lifecycle and the software building process. They can describe various types of system architectures, software architectures and deployments, and can identify the skills needed for software development roles.',
    credentialId: '743ece5b-ae30-4d04-82b4-940b3b70e853',
    credentialUrl: credly('743ece5b-ae30-4d04-82b4-940b3b70e853'),
    skills: ['SDLC', 'System Architecture', 'Software Architecture'],
    featured: false,
  },
  {
    id: '985c0c79-9e71-4a62-a566-39b7d2f024bc',
    name: 'Google UX Design Professional Certificate',
    issuer: 'Coursera',
    authorizedBy: 'Google',
    issuedOn: '1 December 2024',
    issuedOnISO: '2024-12-01',
    description:
      'Those who earn the Google UX Design Certificate have demonstrated their competence in the end-to-end design process. Graduates develop proficiency in empathising with users, defining pain points, ideating solutions, creating wireframes and prototypes, and testing designs.',
    credentialId: '985c0c79-9e71-4a62-a566-39b7d2f024bc',
    credentialUrl: credly('985c0c79-9e71-4a62-a566-39b7d2f024bc'),
    skills: ['UX Design', 'Wireframing', 'Prototyping', 'Usability Testing'],
    credits: '9 ECTS recommended (FIBAA)',
    featured: true,
  },
  {
    id: 'e3a7d62e-bb7c-4198-971f-14e225eee400',
    name: 'Python Essentials 2',
    issuer: 'Cisco',
    issuedOn: '2 January 2024',
    issuedOnISO: '2024-01-02',
    description:
      'Cisco, in collaboration with the OpenEDG Python Institute, verifies the earner has knowledge and skills in intermediate aspects of Python programming, including modules, packages, exceptions, file processing, general coding techniques and object-oriented programming.',
    credentialId: 'e3a7d62e-bb7c-4198-971f-14e225eee400',
    credentialUrl: credly('e3a7d62e-bb7c-4198-971f-14e225eee400'),
    skills: ['Python', 'OOP', 'Modules & Packages', 'Exception Handling'],
    featured: false,
  },
  {
    id: 'f095e45e-26ce-42b2-ae14-0c7a1cafec19',
    name: 'JavaScript Essentials 1',
    issuer: 'Cisco',
    issuedOn: '11 October 2023',
    issuedOnISO: '2023-10-11',
    description:
      'Cisco, in collaboration with the OpenEDG JS Institute, verifies the earner knows the syntax of core JavaScript, can work with variables, operators, flow control and functions, knows the basics of the data types system, and can design, develop and improve simple JavaScript programs.',
    credentialId: 'f095e45e-26ce-42b2-ae14-0c7a1cafec19',
    credentialUrl: credly('f095e45e-26ce-42b2-ae14-0c7a1cafec19'),
    skills: ['JavaScript', 'Algorithmic Thinking', 'Programming Fundamentals'],
    featured: false,
  },
  {
    id: '84fc891c-fe7c-4ff3-9bd7-7ea8428b3c93',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    issuedOn: '2 January 2024',
    issuedOnISO: '2024-01-02',
    description:
      'Cisco verifies the earner has introductory knowledge of cybersecurity, including the global implications of cyber threats on industries. They understand vulnerabilities, and threat detection and defense.',
    credentialId: '84fc891c-fe7c-4ff3-9bd7-7ea8428b3c93',
    credentialUrl: credly('84fc891c-fe7c-4ff3-9bd7-7ea8428b3c93'),
    skills: ['Cybersecurity', 'Threat Detection', 'Vulnerabilities'],
    featured: false,
  },
]

/** Newest first — the order the certifications page and home section use. */
export const certificationsByDate = [...certifications].sort((a, b) =>
  b.issuedOnISO.localeCompare(a.issuedOnISO),
)

export const featuredCertifications = certificationsByDate.filter((c) => c.featured)

/**
 * Short labels for organisations whose registered name is too long to sit in a
 * card header. The full name is retained in the data and on Credly.
 */
const issuerDisplayNames: Record<string, string> = {
  'Amazon Web Services Training and Certification': 'AWS',
}

export function displayIssuer(organisation: string): string {
  return issuerDisplayNames[organisation] ?? organisation
}

/** Distinct issuing organisations, used for the filter control. */
export const certificationIssuers = Array.from(
  new Set(certifications.map((c) => c.authorizedBy ?? c.issuer)),
).sort()
