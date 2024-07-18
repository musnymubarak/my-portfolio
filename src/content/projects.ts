import type { Project, ProjectSummary } from './types'

/**
 * Project database.
 *
 * Sources, in order of authority:
 *   1. My_Projects/<folder>/Details.txt — the written brief for each project
 *   2. The screenshots in the same folder — used for gallery captions and alt
 *      text describing what is genuinely visible on screen
 *   3. My_Resumes/Careed_Details.txt and Mohamed_Musni_DevOps_CV.pdf — for the
 *      engineering projects that have no screenshot folder
 *
 * Where a brief names a technology stack it is reproduced here. Where it does
 * not, the `technologies` list is limited to what the source states, and the
 * case study describes observed product behaviour rather than guessing at an
 * implementation. No URL, metric or outcome here is invented.
 */
export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'daily-grocer',
    name: 'Daily Grocer',
    tagline: 'Multi-store grocery delivery platform with a server-driven storefront and a Flutter app.',
    overview:
      'An on-demand grocery platform connecting independent convenience stores to local customers across the UK. One FastAPI backend serves a React storefront, an admin dashboard and native iOS and Android clients, with store discovery driven by postcode geolocation and a layout engine that lets the marketing team rebuild the home page without a release.',
    category: 'E-Commerce',
    industry: 'Grocery & Rapid Delivery',
    client: 'Daily Grocer',
    accent: '#e11d3a',
    weight: 100,
    featured: true,
    technologies: [
      'FastAPI',
      'Python 3.11',
      'React 18',
      'TypeScript',
      'PostgreSQL 15',
      'Redis 7',
      'Celery',
      'Flutter',
      'Docker',
      'Nginx',
      'Stripe',
      'SQLAlchemy',
      'Pydantic',
      'Tailwind CSS',
      'Vite',
      'Framer Motion',
      'Google Maps Platform',
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Daily Grocer is a modern on-demand e-commerce platform designed to bridge independent convenience stores and local customers. The platform delivers an end-to-end shopping experience: from instant store discovery and smart delivery fee calculations to seamless checkout, real-time inventory tracking, and full admin order orchestration.',
        ],
      },
      {
        heading: 'Key features',
        bullets: [
          'Server-driven home and CMS engine — a dynamic layout management system letting marketing teams configure hero carousels, category grids, promo banners and product showcases in real time, without app re-deployments.',
          'Multi-store geolocation and delivery radius — computes distance-based delivery tiers, store operating hours and localised stock availability from the customer postcode.',
          'Omnichannel architecture — a unified FastAPI backend serving responsive web storefronts, administrative dashboards and native iOS and Android mobile clients.',
          'Streamlined checkout and payment — Stripe for secure card transactions, alongside automated order lifecycle state machines covering pending, preparing, dispatched and delivered.',
          'High-performance caching and async pipelines — Redis-backed caching for the high-traffic catalogue pages, combined with Celery background workers for email receipts, stock alerts and periodic cleanup.',
        ],
      },
      {
        heading: 'Architecture',
        rows: [
          {
            term: 'Frontend storefront',
            detail: 'React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons',
          },
          { term: 'Mobile app', detail: 'Flutter and Dart, cross-platform iOS and Android' },
          {
            term: 'Backend & APIs',
            detail: 'FastAPI on Python 3.11+, SQLAlchemy 2 (async), Pydantic v2',
          },
          {
            term: 'Database & cache',
            detail: 'PostgreSQL 15, Redis 7 for caching, sessions and as the broker',
          },
          { term: 'Background tasks', detail: 'Celery and Celery Beat' },
          {
            term: 'DevOps & infrastructure',
            detail: 'Docker, Docker Compose, Nginx as reverse proxy and SSL termination, Linux VPS',
          },
          { term: 'Integrations', detail: 'Stripe API, Google Maps Platform' },
        ],
      },
      {
        heading: 'My contribution',
        bullets: [
          'Designed and implemented the full-stack platform across React 18, TypeScript, Tailwind CSS, FastAPI and PostgreSQL.',
          'Engineered the server-driven UI architecture that renders marketing banners, carousels and promotional grids from admin CMS configuration.',
          'Integrated Redis caching layers and Celery async workers, reducing catalogue response times by over 60% under concurrent load.',
          'Integrated the Stripe Payments API and distance-based delivery algorithms for real-time fee calculation and order processing.',
          'Containerised the full ecosystem — frontend, admin, backend, Postgres, Redis, Celery and Nginx — with Docker Compose for continuous deployment.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/daily-grocer/01.webp',
        alt: 'Daily Grocer web storefront home page with a "Farm Fresh Daily" hero slide, store context chip and product search bar.',
        caption: 'The storefront home page. This hero slide, its copy and its call to action are all configured from the CMS rather than shipped in the build.',
        width: 1600,
        height: 812,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/daily-grocer/02.webp',
        alt: 'Daily Grocer home page showing the "Fresh picks, delivered" hero slide above category tiles.',
        caption: 'A second configured slide. The persistent header carries the selected store and its delivery estimate on every page.',
        width: 1600,
        height: 799,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/daily-grocer/03.webp',
        alt: 'Daily Grocer home page with the "Quality Pantry & Kitchen Staples" hero slide.',
        caption: 'A third slide in the rotating banner set, demonstrating the layout engine driving the carousel.',
        width: 1600,
        height: 813,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/daily-grocer/04.webp',
        alt: 'Daily Grocer World Foods category listing page with product cards and an aisle search field.',
        caption: 'A category aisle. Stock and pricing resolve against the store the customer selected by postcode.',
        width: 1600,
        height: 862,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/daily-grocer/05.webp',
        alt: 'Daily Grocer account page showing the My Details form alongside a member sidebar.',
        caption: 'The customer account area, with personal details, orders and addresses.',
        width: 1600,
        height: 872,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/daily-grocer/06.webp',
        alt: 'Daily Grocer Flutter app home tab on iOS showing the store banner, category grid and product cards.',
        caption: 'The Flutter client, home tab. It renders the same server-driven layout the web storefront does.',
        width: 720,
        height: 1557,
        orientation: 'portrait',
      },
      {
        src: '/images/projects/daily-grocer/07.webp',
        alt: 'Daily Grocer mobile app store discovery screen with a UK postcode field and a use-my-location button.',
        caption: 'Store discovery. A postcode or device location resolves which stores can deliver, and at what fee.',
        width: 720,
        height: 1557,
        orientation: 'portrait',
      },
      {
        src: '/images/projects/daily-grocer/08.webp',
        alt: 'Daily Grocer mobile app stores tab listing nearby stores available for delivery.',
        caption: 'The stores tab, listing every outlet within delivery range of the entered address.',
        width: 720,
        height: 1557,
        orientation: 'portrait',
      },
      {
        src: '/images/projects/daily-grocer/09.webp',
        alt: 'Daily Grocer mobile app profile screen with the member identity card and account options.',
        caption: 'The mobile account screen, sharing its session and identity model with the web client.',
        width: 720,
        height: 1557,
        orientation: 'portrait',
      },
    ],
    links: [{ label: 'dailygrocer.co.uk', href: 'https://dailygrocer.co.uk/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'devboard',
    name: 'DevBoard',
    tagline: 'A Jira-style task tracker built as eight microservices on Kubernetes, provisioned with Terraform.',
    overview:
      'A developer task tracker built deliberately as a distributed system rather than a monolith, to work through service boundaries, inter-service contracts and the operational stack underneath them. Eight Node.js and TypeScript services behind a Next.js front end, running on Kubernetes in an AWS environment provisioned entirely with Terraform.',
    category: 'Platform Engineering',
    accent: '#2dd4a7',
    weight: 95,
    featured: true,
    technologies: ['Node.js', 'TypeScript', 'Next.js', 'Kubernetes', 'AWS', 'Terraform', 'Microservices', 'Docker'],
    sections: [
      {
        heading: 'What it is',
        body: [
          'DevBoard is a Jira-style task tracker for engineering teams. The interesting part is not the task board — it is the shape of the system underneath it. The application is decomposed into eight independent Node.js and TypeScript services, each independently containerised and independently deployable, with a Next.js 15 front end sitting on top.',
          'The project exists to exercise a full four-layer stack end to end: Terraform provisions AWS, AWS hosts Kubernetes, Kubernetes runs the services, and the services compose into the product.',
        ],
      },
      {
        heading: 'Engineering focus',
        bullets: [
          'Designed and built the tracker as eight Node.js and TypeScript microservices with a Next.js 15 front end.',
          'Defined the service boundaries and the REST contracts between them, so each service is independently containerised and deployable.',
          'Provisioned the AWS environment with Terraform and ran the services on Kubernetes.',
          'Documented the four-layer architecture — Terraform to AWS to Kubernetes to services — as an interactive guide for other engineers.',
        ],
      },
      {
        heading: 'Architecture',
        rows: [
          { term: 'Layer 1 — Infrastructure as Code', detail: 'Terraform defines and provisions the AWS environment' },
          { term: 'Layer 2 — Cloud', detail: 'AWS hosts the cluster and its supporting resources' },
          { term: 'Layer 3 — Orchestration', detail: 'Kubernetes schedules and runs the containerised services' },
          { term: 'Layer 4 — Services', detail: 'Eight Node.js / TypeScript services behind a Next.js 15 front end' },
        ],
      },
    ],
    screenshots: [],
    links: [],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'sumaiya-college-erp',
    name: 'Sumaiya College ERP',
    tagline: 'A production institutional ERP covering academics, attendance, double-entry finance and inventory.',
    overview:
      'A full-stack management platform built for Sumaiya Ladies Arabic College, replacing manual paperwork and scattered spreadsheets with one role-secured system. It handles the student lifecycle, attendance and examinations, a double-entry financial ledger and inventory control for hundreds of students, faculty and administrative staff.',
    category: 'Enterprise System',
    industry: 'Education',
    client: 'Sumaiya Ladies Arabic College',
    accent: '#0f6b62',
    weight: 92,
    featured: true,
    technologies: [
      'React 18',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma ORM',
      'Tailwind CSS',
      'React Query',
      'Docker',
      'Nginx',
      'JWT',
      'REST APIs',
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Sumaiya College ERP (EduManage) is a production-deployed, full-stack management platform engineered to streamline and digitise day-to-day operations for an educational institution. It replaces manual paperwork and disparate spreadsheets with a unified, role-secured centralised system catering to hundreds of students, faculty and administrative staff.',
        ],
      },
      {
        heading: 'Modules',
        bullets: [
          'Role-based access control — granular access for super admins, principals, vice principals, administrative staff and financial officers, with JWT-based authentication.',
          'Academic administration — the complete student lifecycle covering admissions, class allocations, medical histories, parent and guardian registries and document archives, alongside faculty profiles and schedule management.',
          'Attendance and examination engine — daily student and teacher attendance logging, grade entry, exam term scheduling and automated PDF report card generation.',
          'Enterprise financial suite — ledger accounting including tuition and fee scheduling, partial payment tracking, banking transactions, income and expenditure tracking and automated balance sheet reports.',
          'Inventory and resource control — real-time asset auditing, supply tracking for desks, media supplies and lab tools, and low-stock alerts.',
          'Administrative task hub and analytics — operational dashboards with real-time statistics, audit logs and notification-driven administrative todo lists.',
        ],
      },
      {
        heading: 'Technical highlights',
        rows: [
          {
            term: 'Frontend',
            detail: 'React 18, TypeScript, Tailwind CSS, Lucide Icons and React Query for client-side caching',
          },
          {
            term: 'Backend',
            detail: 'RESTful micro-service style API on Node.js and Express with Prisma ORM, strictly typed with TypeScript',
          },
          {
            term: 'Data integrity & security',
            detail:
              'Relational modelling in PostgreSQL with foreign keys, transactional queries for financial operations, Bcrypt password hashing and protected routes',
          },
          {
            term: 'Deployment',
            detail: 'Containerised with Docker and Docker Compose, reverse-proxied via Nginx with automated SSL and persistent volume storage',
          },
        ],
      },
      {
        heading: 'My contribution',
        bullets: [
          'Engineered and deployed a production-grade institutional ERP serving an active college, managing student records, faculty schedules, inventory and automated academic report generation.',
          'Designed the financial module supporting tuition payment tracking, bank transfers, income and expenditure ledgers and automated balance sheet generation.',
          'Implemented multi-tier role-based access control across five user roles using JWT and custom middleware to protect sensitive administrative and financial endpoints.',
          'Optimised application performance using Vite, React Query caching and indexed PostgreSQL queries via Prisma ORM, reducing client load times by over 40%.',
          'Containerised the full stack with Docker and Docker Compose, configuring the Nginx reverse proxy, SSL termination and volume persistence for high-availability deployment.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/sumaiya-college-erp/01.webp',
        alt: 'Sumaiya College ERP sign-in page, a centred login card over a teal and emerald gradient with gold arabesque ornamentation.',
        caption: 'The sign-in screen. Every route behind it resolves against one of five roles, from super admin to financial officer.',
        width: 1600,
        height: 797,
        orientation: 'landscape',
      },
    ],
    links: [],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'manaveli',
    name: 'Manaveli',
    tagline: 'A mental health information platform for Sri Lanka, with a WHO-5 self-check built in.',
    overview:
      'A public mental health platform built with Base Hospital Tellippalai in Jaffna. It publishes condition guides, facts and resources in an accessible, multilingual interface, and includes an interactive WHO-5 Well-Being Index self-check designed to be private by default.',
    category: 'Product Website',
    industry: 'Health & Wellness',
    client: 'Manaveli',
    accent: '#1b90a8',
    weight: 88,
    featured: true,
    technologies: ['Accessible UI', 'Multilingual Support', 'Responsive Design', 'WHO-5 Self-Assessment'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Manaveli is a modern mental health information platform for Sri Lanka. The site provides accessible mental health information, condition guides, facts and articles, resources, media content, and an interactive WHO-5 self-check experience.',
          'The work focused on a clean, accessible and responsive experience with intuitive navigation, multilingual support and privacy-conscious interactions — combining considered UI design with practical functionality so that mental health information is genuinely easier to reach.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A WHO-5 Well-Being Index self-check presented as five questions taking around two minutes, with the framing and privacy notice shown up front rather than buried.',
          'A categorised article library with filter pills and counts, so a reader can narrow to a topic before scrolling.',
          'A resources section that separates papers and data from general reading, and states plainly when a link opens on a publisher site or downloads a PDF.',
          'A persistent help affordance held on every page, so the route to support is never more than one interaction away.',
          'Hospital contact details carried in a utility bar at the top of every page — location, email and telephone.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/manaveli/01.webp',
        alt: 'Manaveli home page hero reading "Mental health is not the absence of illness. It is a state of wellbeing." over a cream background.',
        caption: 'The home page. The teal utility bar carries the hospital location, email and phone on every page of the site.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/manaveli/02.webp',
        alt: 'Manaveli about page headed "A mental health website built by a service, for the people it serves".',
        caption: 'The about page, stating who runs the service and who it is for.',
        width: 1600,
        height: 799,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/manaveli/03.webp',
        alt: 'Manaveli facts listing page showing category filter pills with counts above a grid of article cards.',
        caption: 'The article library. Category pills carry counts so readers can see how much is available before filtering.',
        width: 1600,
        height: 804,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/manaveli/04.webp',
        alt: 'Manaveli WHO-5 self-check introduction screen reading "Five questions. About two minutes."',
        caption: 'The WHO-5 self-check. The scope and the privacy position are stated before the first question.',
        width: 1600,
        height: 803,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/manaveli/05.webp',
        alt: 'Manaveli resources page showing the "Papers and data" section with external link cards.',
        caption: 'Resources, with each entry labelled by where it leads and what will happen when it is opened.',
        width: 1600,
        height: 804,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'manaveli.org.lk', href: 'https://manaveli.org.lk/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'blue-ocean-adventures',
    name: 'Blue Ocean Adventures',
    tagline: 'A marine tourism platform for Nilaveli, with a multi-step booking workflow.',
    overview:
      'A booking platform for a marine tourism operator on the east coast of Sri Lanka. It presents snorkelling, dolphin and whale watching, fishing, lagoon trips and private charters with pricing and availability, and takes the visitor through a staged booking request that lands directly with the operator.',
    category: 'Product Website',
    industry: 'Marine Tourism',
    client: 'Blue Ocean Adventures, Nilaveli',
    accent: '#1e90d6',
    weight: 84,
    featured: true,
    technologies: ['Booking Workflow', 'Media Gallery', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern marine tourism and adventure booking platform for Blue Ocean Adventures in Nilaveli, Sri Lanka. The platform showcases snorkelling, dolphin watching, whale watching, fishing, lagoon trips and private tours, with detailed experiences, pricing, availability information, and a multi-step booking workflow.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'An experiences catalogue where every package states plainly what is included — a licensed boat, an expert guide, safety equipment and refreshments — so pricing is legible before enquiry.',
          'A four-step booking engine that assembles a structured booking request and routes it to the operator’s coordinator.',
          'A filterable media gallery of photographs and video from real expeditions, browsable by activity type.',
          'An underwater hero treatment built from layered silhouettes, drifting particles and light shafts rather than a flat background image.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/blue-ocean-adventures/01.webp',
        alt: 'Blue Ocean Adventures home page hero reading "Discover the Hidden Paradise of Nilaveli" over a dark underwater scene.',
        caption: 'The home page. The underwater scene is layered — silhouettes, bubbles and light shafts moving at different depths.',
        width: 1600,
        height: 793,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/blue-ocean-adventures/02.webp',
        alt: 'Blue Ocean Adventures experiences section headed "Adventures on the East Coast" with package cards.',
        caption: 'The experiences catalogue, with what each package includes stated above the cards.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/blue-ocean-adventures/03.webp',
        alt: 'Blue Ocean Adventures gallery section headed "Moments from the Deep" with filter chips above a photo grid.',
        caption: 'The gallery, filterable by activity, drawing on real expedition photography and video.',
        width: 1600,
        height: 794,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/blue-ocean-adventures/04.webp',
        alt: 'Blue Ocean Adventures booking engine headed "Reserve Your Adventure" showing a four-step progress indicator.',
        caption: 'The booking engine. Four steps assemble a structured request rather than a single unstructured enquiry form.',
        width: 1600,
        height: 797,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'lankablueocean.com', href: 'https://lankablueocean.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'n8n-automation-platform',
    name: 'n8n Automation Platform',
    tagline: 'Self-hosted workflow automation on Oracle Cloud, instrumented with Prometheus and Grafana.',
    overview:
      'A self-hosted n8n deployment run as a proper piece of infrastructure rather than a container left running. It sits on Oracle Cloud Linux VMs under Docker, managed through systemd, hardened at the SSH layer, and instrumented with Prometheus and Grafana dashboards covering CPU, memory, service health and uptime.',
    category: 'Platform Engineering',
    accent: '#f5b544',
    weight: 82,
    featured: true,
    technologies: [
      'Oracle Cloud Infrastructure',
      'Docker',
      'Linux',
      'Prometheus',
      'Grafana',
      'systemd',
      'n8n',
      'Bash',
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A self-hosted n8n workflow automation platform deployed and administered on Oracle Cloud Infrastructure Linux VMs, containerised with Docker.',
          'The point of the project was to run something small end to end the way production is actually run: provisioned, hardened, patched, monitored and observable, rather than started once and forgotten.',
        ],
      },
      {
        heading: 'Engineering focus',
        bullets: [
          'Deployed and administered self-hosted n8n on Oracle Cloud Linux VMs with Docker, managed as systemd services with patching and SSH hardening.',
          'Instrumented the host and services with Prometheus for metrics collection.',
          'Built Grafana dashboards covering CPU, memory, service health and uptime.',
          'Administered the Linux server end to end — systemd units, updates and SSH access control.',
          'Automated operational workflows integrating external APIs.',
        ],
      },
    ],
    screenshots: [],
    links: [],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'luwenza',
    name: 'Luwenza International',
    tagline: 'A B2B export platform for Ceylon produce, with a full admin back office.',
    overview:
      'A business-to-business commerce platform for Luwenza International, letting overseas buyers browse premium Sri Lankan produce, submit enquiries and reach the company directly. Behind it sits a custom admin dashboard managing products, categories, enquiries, customers, banners, users and business reports.',
    category: 'E-Commerce',
    industry: 'Agriculture, Import & Export',
    client: 'Luwenza International (Pvt) Ltd',
    accent: '#c9a227',
    weight: 78,
    featured: false,
    technologies: ['Admin Dashboard', 'Product Catalogue', 'Enquiry Management', 'Business Reporting'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern B2B e-commerce platform for Luwenza International, enabling international buyers to explore premium Sri Lankan products, submit inquiries, and connect with the company. The platform includes a custom admin dashboard for managing products, categories, inquiries, customers, banners, users, and business reports.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A public catalogue of 34 products organised into origin-led categories — Ceylon cinnamon, tea, herbs and spices, grains and pulses, and coconut products — each carrying its own count in the filter sidebar.',
          'A search-and-filter panel so a buyer can narrow by category or search term without leaving the listing.',
          'An enquiry path aimed at trade buyers rather than a retail checkout, with a direct WhatsApp channel held in the navigation.',
          'An admin dashboard with dedicated screens for products, categories, enquiries, customers, banners, users and reports.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/luwenza/01.webp',
        alt: 'Luwenza home page hero reading "From Sri Lanka\'s Finest Fields to Your Global Market" on a dark brown and gold layout.',
        caption: 'The home page, positioning the company for overseas trade buyers rather than retail customers.',
        width: 1600,
        height: 804,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/luwenza/02.webp',
        alt: 'Luwenza about page with the company story section on a cream background.',
        caption: 'The about page, carrying the company story and its export credentials.',
        width: 1600,
        height: 803,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/luwenza/03.webp',
        alt: 'Luwenza products catalogue with a category filter sidebar showing counts beside each Ceylon product category.',
        caption: 'The catalogue. Each category carries its product count so a buyer can judge depth before filtering.',
        width: 1600,
        height: 801,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/luwenza/04.webp',
        alt: 'Luwenza services page showing a split panel with a tea plantation photograph beside service copy.',
        caption: 'The services page, covering sourcing, quality and export logistics.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/luwenza/05.webp',
        alt: 'Luwenza admin dashboard products management screen with a dark sidebar listing dashboard sections.',
        caption: 'The admin back office. Products, categories, enquiries, customers, banners and reports each get their own screen.',
        width: 1600,
        height: 803,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'luwenza.com', href: 'https://www.luwenza.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'vma-studio',
    name: 'VMA Studio',
    tagline: 'An editorial portfolio site for an architecture and BIM practice.',
    overview:
      'A website for VMA Studio, an architecture and BIM services practice. The build pairs a premium editorial visual system with the practical needs of a professional services site: a filterable project portfolio, service and team pages, and a clear route to contact.',
    category: 'Product Website',
    industry: 'Architecture & Interior Design',
    client: 'VMA Studio',
    accent: '#d9ae3c',
    weight: 74,
    featured: false,
    technologies: ['Portfolio Filtering', 'Editorial Layout', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern, responsive website for VMA Studio, an architecture and BIM services company. The site features a premium visual design, service showcases, team information, a project portfolio with category filtering, and clear contact calls to action.',
          'The aim was a professional digital presence that reflects the practice’s architectural expertise while staying smooth across desktop and mobile.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A project portfolio filterable by discipline — 2D drafting, 3D visualisation and BIM — so a prospective client can go straight to the work that matches their brief.',
          'A two-tone editorial system of near-black navy and warm cream with a single antique-gold accent, carried consistently across every section.',
          'A scroll progress indicator held above the sticky navigation.',
          'Service and team sections presented as part of one continuous narrative rather than disconnected pages.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/vma-studio/01.webp',
        alt: 'VMA Studio home page hero reading "Precision Built. Beautifully Designed." over a dusk photograph of a modern house.',
        caption: 'The home page, leading with the practice’s own built work at dusk.',
        width: 1600,
        height: 802,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/vma-studio/02.webp',
        alt: 'VMA Studio about section headed "Designing the Future, Honoring the Past" on a cream background.',
        caption: 'The about section, set on cream to break the dark sections either side of it.',
        width: 1600,
        height: 797,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/vma-studio/03.webp',
        alt: 'VMA Studio portfolio section headed "Our Portfolio" with category filter chips for 2D drafting, 3D visualisation and BIM.',
        caption: 'The portfolio, filterable by 2D drafting, 3D visualisation or BIM.',
        width: 1600,
        height: 805,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'vma-studio.com', href: 'https://vma-studio.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'wakeup-health',
    name: 'WakeUp Health',
    tagline: 'A Canadian non-profit site with PayPal one-time and recurring donations.',
    overview:
      'A website for WakeUp Health Organization, a Canadian non-profit working on accessible health and community support. It covers programs, events, community initiatives and organisational information, and integrates a secure PayPal donation system supporting both one-time and recurring giving.',
    category: 'Product Website',
    industry: 'Health & Community, Non-Profit',
    client: 'WakeUp Health Organization',
    accent: '#f0674a',
    weight: 72,
    featured: false,
    technologies: ['PayPal Donations', 'Recurring Payments', 'Google Maps', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern, responsive website for WakeUp Health Organization, a Canadian non-profit focused on accessible health and community support. The build covers pages for programs, events, community initiatives, organisational information and contact services.',
          'A secure PayPal donation system was integrated with one-time and recurring options, letting supporters contribute directly online.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'PayPal donation integration supporting both one-time and recurring contributions.',
          'A causes listing where a supporter can choose a specific program, or give to wherever need is greatest.',
          'A donation page that explains where money goes before asking for it, rather than after.',
          'Google Maps integration on the contact page, alongside the organisation’s address, phone and opening hours.',
          'Program, event and community initiative pages carrying the organisation’s trauma-informed, community-led positioning.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/wakeup-health/01.webp',
        alt: 'WakeUp Health home page hero reading "Building healthier lives, stronger communities together." over a photograph of program participants.',
        caption: 'The home page. Address, phone and opening hours sit in the utility bar above the fold.',
        width: 1600,
        height: 807,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/wakeup-health/02.webp',
        alt: 'WakeUp Health about page headed "Trauma-informed, people-centered, community-led".',
        caption: 'The about page, leading with the organisation’s stated approach.',
        width: 1600,
        height: 802,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/wakeup-health/03.webp',
        alt: 'WakeUp Health community support page headed "Where would you like to help?" with cause category filters.',
        caption: 'The causes listing, with a route for supporters who would rather give where need is greatest.',
        width: 1600,
        height: 792,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/wakeup-health/04.webp',
        alt: 'WakeUp Health donation page headed "Every dollar has a job" beside a donation form.',
        caption: 'The donation page. It accounts for where money goes before presenting the PayPal form.',
        width: 1600,
        height: 803,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/wakeup-health/05.webp',
        alt: 'WakeUp Health contact page headed "Come and visit" above an embedded Google map of the Scarborough location.',
        caption: 'The contact page, with the Scarborough location embedded rather than described.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'wakeuphealth.org', href: 'https://wakeuphealth.org/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'lancan-immigration',
    name: 'LanCan Immigration',
    tagline: 'A consultancy site with a self-service news publishing back end.',
    overview:
      'A website for a Canadian immigration consultancy, built front end and back end. Its distinguishing feature is a news management system that lets the client draft, edit, publish and manage immigration articles from an admin panel, without needing a developer to post an update.',
    category: 'Product Website',
    industry: 'Legal & Immigration Services',
    client: 'LanCan Immigration Consultants',
    accent: '#17b0c4',
    weight: 70,
    featured: false,
    technologies: ['Custom CMS', 'Admin Panel', 'Article Publishing', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern, responsive website for a Canadian immigration consultancy. I built both the frontend and the backend, including a dynamic news management system that allows the client to create, edit, publish and manage immigration-related articles directly from the admin panel.',
          'Immigration rules change often, and a consultancy that cannot publish an update the day it lands loses the credibility the site is meant to build. The publishing tool exists so the client never has to wait on a developer to say something timely.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A custom news management system with create, edit, publish and manage operations, driven from an admin panel.',
          'A publish dialog that captures the article parameters and updates the public catalogue directly.',
          'Service and about pages carrying the consultancy’s credentials, with contact details held in a utility bar on every page.',
          'A trust-forward layout built for a regulated professional service rather than a generic business template.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/lancan-immigration/01.webp',
        alt: 'LanCan Immigration home page hero reading "Your Pathway to Canada Starts Here." on a navy and teal layout.',
        caption: 'The home page. Phone and email sit in a utility bar above the navigation on every page.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/lancan-immigration/02.webp',
        alt: 'LanCan Immigration about page banner reading "Full Service Immigration Consultancy Firm".',
        caption: 'The about page, establishing the consultancy’s scope and credentials.',
        width: 1600,
        height: 799,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/lancan-immigration/03.webp',
        alt: 'LanCan Immigration admin panel with the "Publish New Article" dialog open over the news page.',
        caption: 'The publishing tool. The client writes and publishes immigration updates without developer involvement.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'lancanimmigration.com', href: 'https://lancanimmigration.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'aeonic-bio',
    name: 'Aeonic Bio',
    tagline: 'A corporate site for an agricultural biotechnology company.',
    overview:
      'A corporate website for Aeonic Bio, an agricultural biotechnology company developing biological solutions that improve fertilizer efficiency, crop yields and sustainable agricultural performance. The site is structured as an argument — problem, solution, technology — rather than a list of pages.',
    category: 'Product Website',
    industry: 'Agriculture & Biomass Production',
    client: 'Aeonic Bio',
    accent: '#1f7a45',
    weight: 66,
    featured: false,
    technologies: ['Narrative Layout', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern corporate website for Aeonic Bio, an agricultural biotechnology company developing biological solutions to improve fertilizer efficiency, crop yields, and sustainable agricultural performance.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A page structured as a sequence — problem, solution, technology, contact — with the navigation mirroring that argument rather than listing generic sections.',
          'A light-and-dark section rhythm giving the scroll an editorial cadence instead of one flat tone.',
          'A full-bleed aerial hero establishing the agricultural context before any claim is made.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/aeonic-bio/01.webp',
        alt: 'Aeonic Bio home page hero reading "The Biological Performance Layer for Modern Agriculture" over an aerial photograph of a crop field at sunrise.',
        caption: 'The home page, opening on an aerial crop field at sunrise.',
        width: 1600,
        height: 805,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/aeonic-bio/02.webp',
        alt: 'Aeonic Bio problem section headed "Modern Agriculture Has a Massive Problem" on a near-white background.',
        caption: 'The problem section, stating the case before the product appears.',
        width: 1600,
        height: 800,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/aeonic-bio/03.webp',
        alt: 'Aeonic Bio technology section headed "What Makes It Different" on a deep forest-green background.',
        caption: 'The technology section, switching to a dark field to mark the shift from problem to answer.',
        width: 1600,
        height: 810,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'aeonicbio.com', href: 'https://aeonicbio.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'kasis-chicken',
    name: "Kasi's Chicken",
    tagline: 'A restaurant site built around an interactive menu and a single ordering action.',
    overview:
      'A restaurant website for Kasi’s Chicken, built around an engaging homepage, an interactive menu with food categories, promotional sections and a clear ordering call to action held constantly in view.',
    category: 'Product Website',
    industry: 'Restaurants',
    client: "Kasi's Chicken",
    accent: '#e8202a',
    weight: 62,
    featured: false,
    technologies: ['Interactive Menu', 'Responsive Design'],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A modern, responsive restaurant website for Kasi’s Chicken, featuring an engaging homepage, interactive menu, food categories, promotional sections, and clear call-to-action elements. The site is optimised for a smooth and user-friendly experience across desktop and mobile devices.',
        ],
      },
      {
        heading: 'What is in the build',
        bullets: [
          'A single persistent ordering action pinned to the navigation on every page, so ordering is never more than one click away.',
          'A menu organised by category — burgers, chicken, wraps and more — rather than presented as one long undifferentiated list.',
          'An oversized condensed display typeface carrying the brand, alternating solid and outline treatments between sections.',
          'A contact page leading with location and walk-in details, which is what a local restaurant’s visitors are usually after.',
        ],
      },
    ],
    screenshots: [
      {
        src: '/images/projects/kasis-chicken/01.webp',
        alt: "Kasi's Chicken home page hero with the oversized headline LEGENDARY. SHARING. COMBOS. beside a photograph of fried chicken.",
        caption: 'The home page, with the ordering action held in the navigation from the first scroll.',
        width: 1600,
        height: 790,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/kasis-chicken/02.webp',
        alt: "Kasi's Chicken menu page headed FULL MENU, EVERY DAY. with category navigation and dish cards.",
        caption: 'The menu, split by category so a visitor can jump straight to what they came for.',
        width: 1600,
        height: 860,
        orientation: 'landscape',
      },
      {
        src: '/images/projects/kasis-chicken/03.webp',
        alt: "Kasi's Chicken contact page headed COME VISIT US TODAY. with address and opening details.",
        caption: 'The contact page, leading with location and walk-in details.',
        width: 1600,
        height: 798,
        orientation: 'landscape',
      },
    ],
    links: [{ label: 'kasischicken.com', href: 'https://kasischicken.com/', kind: 'live' }],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'pos-system',
    name: 'POS System',
    tagline: 'A web point-of-sale application deployed and maintained on Azure VMs.',
    overview:
      'A production web-based point-of-sale application, deployed and kept running on Microsoft Azure virtual machines. The work here was the operational half: Linux server configuration, networking, containerisation of the backend services, secure access, and diagnosing failures in a live environment.',
    category: 'Platform Engineering',
    accent: '#2dd4a7',
    weight: 58,
    featured: false,
    technologies: ['Microsoft Azure', 'Docker', 'Linux', 'SSH', 'Networking'],
    sections: [
      {
        heading: 'Engineering focus',
        bullets: [
          'Deployed and maintained a production web-based POS application on Microsoft Azure VMs, configuring the Linux server environments and networking.',
          'Containerised backend services with Docker for consistent, repeatable deployments.',
          'Managed SSH-based access and secure environment configuration.',
          'Diagnosed and resolved deployment and runtime issues in live environments.',
        ],
      },
    ],
    screenshots: [],
    // The resume also lists a demo at mcube.duckdns.org. That host resolves but
    // no longer answers, so the link is withheld rather than shipped broken.
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/musnymubarak/POS', kind: 'source' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'edulink',
    name: 'EduLink',
    tagline: 'A peer-to-peer tutoring platform with course quizzes and a moderation dashboard.',
    overview:
      'An interactive tutoring platform where students enrol in courses, talk to peers through a community messaging system, and request personal or group classes from specific tutors. Enrolled courses carry section quizzes for tracking progress, and an admin dashboard handles reports and course quality.',
    category: 'Product Engineering',
    accent: '#2dd4a7',
    weight: 50,
    featured: false,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A peer-to-peer tutoring platform. Students enrol in available courses, engage with peers through a community messaging system, and request personal or group classes from specific tutors. Section quizzes inside enrolled courses support learning and track progress.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Course enrolment with section quizzes inside each enrolled course.',
          'A community messaging system connecting students with their peers.',
          'Personal and group class requests directed at specific tutors.',
          'An admin dashboard receiving course reports from students, alerting tutors to reported issues and monitoring course quality.',
          'Student ratings and reviews on courses, feeding back to both tutors and future learners.',
        ],
      },
    ],
    screenshots: [],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/musnymubarak/EduLink-Peer-Tutoring-App',
        kind: 'source',
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'mcube',
    name: 'MCube',
    tagline: 'A clothing e-commerce platform with a real-time admin dashboard.',
    overview:
      'A full e-commerce platform for clothing, covering sign-up and sign-in, product browsing, cart and checkout, with filtering to help shoppers narrow down. An admin dashboard handles products and customer orders in real time.',
    category: 'E-Commerce',
    accent: '#2dd4a7',
    weight: 46,
    featured: false,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A fully functional e-commerce platform for clothing where users can sign up, log in, browse products, add items to their cart and complete purchases. Filtering options help users find products and personalise their shopping experience.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Account sign-up and sign-in, product browsing, cart and checkout.',
          'Product filtering to narrow the catalogue.',
          'An admin dashboard to add, update and remove products and manage customer orders in real time, covering inventory management and order processing.',
        ],
      },
    ],
    screenshots: [],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/SGopinath89/IT2342024MCube',
        kind: 'source',
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'booking-app',
    name: 'Hotel Booking Platform',
    tagline: 'A hotel booking application with an owner-facing management dashboard.',
    overview:
      'A hotel booking application where users search for hotels, select dates and book rooms, filtering by location, price and amenities. A companion admin dashboard lets hotel owners manage listings, track reservations and handle customer enquiries in real time.',
    category: 'Product Engineering',
    accent: '#2dd4a7',
    weight: 44,
    featured: false,
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A hotel booking application where users can search for hotels, select dates and book rooms. Filtering by location, price and amenities helps users find the right stay.',
        ],
      },
      {
        heading: 'Features',
        bullets: [
          'Hotel search with date selection and room booking.',
          'Filtering by location, price and amenities.',
          'An admin dashboard allowing hotel owners to add, update and manage listings, track reservations and handle customer enquiries in real time.',
        ],
      },
    ],
    screenshots: [],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/musnymubarak/booking-app',
        kind: 'source',
      },
    ],
  },
]

/** Highest weight first — the order used everywhere projects are listed. */
export const projectsByWeight = [...projects].sort((a, b) => b.weight - a.weight)

export const featuredProjects = projectsByWeight.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** Every category that has at least one project, in display order. */
export const projectCategories = [
  'Platform Engineering',
  'E-Commerce',
  'Enterprise System',
  'Product Engineering',
  'Product Website',
].filter((category) => projects.some((p) => p.category === category))

/** Technologies used by more than one project, for the filter control. */
export const projectTechnologies = Array.from(
  projects.reduce((counts, project) => {
    for (const tech of project.technologies) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1)
    }
    return counts
  }, new Map<string, number>()),
)
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tech]) => tech)

/**
 * Related projects for a detail page: prefer the same category, then fall back
 * to shared technologies, then to weight.
 */
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug)
  if (!current) return projectsByWeight.slice(0, limit)

  const scored = projectsByWeight
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTech = p.technologies.filter((t) => current.technologies.includes(t)).length
      const sameCategory = p.category === current.category ? 10 : 0
      return { project: p, score: sameCategory + sharedTech }
    })
    .sort((a, b) => b.score - a.score || b.project.weight - a.project.weight)

  return scored.slice(0, limit).map((s) => s.project)
}

/** Card-sized projection, used wherever a list of projects crosses to a client component. */
export function toSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    name: project.name,
    tagline: project.tagline,
    category: project.category,
    technologies: project.technologies,
    accent: project.accent,
    ...(project.screenshots[0] ? { cover: project.screenshots[0] } : {}),
  }
}

export const projectSummaries = projectsByWeight.map(toSummary)
