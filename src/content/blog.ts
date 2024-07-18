import type { BlogPost } from './types'

/**
 * Articles adapted from the author's own LinkedIn posts, supplied as
 * screenshots in Blogs/.
 *
 * Each post was transcribed verbatim from its screenshot and then edited for
 * the page: headings and lists were introduced, emoji bullets were replaced
 * with real list markup, and prose was tidied. No technical claim, tool,
 * figure or recommendation has been added, removed or altered.
 *
 * Dates: LinkedIn renders relative ages ("6mo", "1yr"), so the screenshots —
 * captured on 3 September 2026 — do not carry exact publication dates. Every
 * post is therefore flagged `dateIsApproximate`, the displayed date is
 * deliberately coarse, and structured data omits a publication date rather
 * than asserting one.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'self-hosting-n8n-on-oracle-cloud-free-tier',
    title: 'A free, production-like n8n setup on Oracle Cloud',
    excerpt:
      'n8n Cloud stopped being practical for personal projects, and a local Docker install cannot give you stable webhooks. Oracle Cloud’s free tier can.',
    date: 'March 2026',
    dateISO: '2026-03-01',
    dateIsApproximate: true,
    category: 'DevOps',
    tags: ['n8n', 'Automation', 'Docker', 'Oracle Cloud', 'Self-Hosting', 'Webhooks'],
    readingMinutes: 3,
    featured: true,
    sourceNote:
      'Adapted from a LinkedIn post. The screenshot recorded it as six months old on 3 September 2026, so the date above is approximate.',
    body: `A reality check for anyone building automations.

n8n Cloud is no longer a practical free option for personal or demo projects, because of its pricing limits. Yes, you can install n8n locally using Docker or Node.js. But let's be honest: local setups are mainly for learning and experimentation.

## The problem with local n8n setups

- Webhooks are hard to expose reliably.
- There is no stable public URL.
- HTTPS setup is painful.
- It is not suitable for long-running or production-like workflows.

Every one of those matters the moment an automation has to be triggered by something outside your own machine.

## A solid free alternative: Oracle Cloud Infrastructure

With the OCI free tier, you can build a production-like n8n setup at zero cost:

- A free Ubuntu VM.
- n8n running in Docker.
- PostgreSQL in a separate container.
- A public IP address.

## Making it production-ready

From there, three additions close the gap with the hosted product:

- A free subdomain, from DuckDNS or similar.
- HTTPS with Let's Encrypt.
- Stable webhooks and APIs, just like n8n Cloud.

## Who this is for

- Students.
- Personal projects.
- Demos and proofs of concept.
- Anyone learning real-world automation and DevOps.

That last one is the real payoff. Standing this up teaches you the same things a production deployment does: a Linux host you are responsible for, containers you have to network together, a certificate you have to renew, and a public surface you have to secure.`,
  },

  {
    slug: 'why-i-containerise-almost-everything',
    title: 'Why I containerise almost everything',
    excerpt:
      'Deploying used to feel like a lottery. Containers replaced that with repeatability, and Kubernetes turned repeatability into something you can operate.',
    date: '2025',
    dateISO: '2025-07-01',
    dateIsApproximate: true,
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'Containers', 'Deployment', 'Cloud Native', 'Microservices'],
    readingMinutes: 3,
    featured: true,
    sourceNote:
      'Adapted from a LinkedIn post shown as roughly a year old on 3 September 2026, so the date above is approximate. The original carried a headline that contradicted its own argument; the title here reflects what the post actually says.',
    body: `It used to seem like a lottery to deploy an app. You would cross your fingers and hope that nothing would go wrong with production or staging. One package is missing. A small discrepancy in version. Suddenly, debugging took hours.

Everything changed when I began using containers.

Docker lets me distribute my application in a lightweight, portable package that includes its whole environment: the operating system, the dependencies and the configuration. No more nightmares about "it works on my machine".

**If it works once, it works everywhere.** That is repeatability, and it is revolutionary.

## Why I containerise nearly everything

- **Speed.** It is easier to scale, lighter, and faster to deploy. No heavy virtual machines.
- **Isolation.** Every service operates independently, minimising conflicts and improving security.
- **Cloud-native ready.** Containers function flawlessly on bare metal, AWS, GCP and Azure.

## The real power move is Kubernetes

Scaling and managing microservices became not just feasible but genuinely effective once I combined Docker containers with Kubernetes orchestration.

Self-healing, rolling updates and auto-scaling are the closest thing infrastructure has to superpowers.`,
  },

  {
    slug: 'keeping-a-free-tier-backend-awake',
    title: 'Keeping a free-tier backend awake',
    excerpt:
      'Render gives you 750 free hours a month, then puts your service to sleep after fifteen minutes idle. A five-minute ping is all it takes to fix that.',
    date: '2025',
    dateISO: '2025-05-01',
    dateIsApproximate: true,
    category: 'Backend',
    tags: ['Render', 'UptimeRobot', 'Hosting', 'Backend', 'Free Tier', 'Developer Tips'],
    readingMinutes: 3,
    featured: true,
    sourceNote:
      'Adapted from a LinkedIn post shown as roughly a year old on 3 September 2026, so the date above is approximate.',
    body: `As an undergraduate passionate about full-stack development, I am always on the lookout for the best platforms to host the backend of my projects. Recently I discovered Render, which offers 750 free hours per month on its free tier — more than enough to keep a backend running throughout the month.

But there is a catch. If your backend stays inactive for more than 15 minutes, Render puts it to sleep. When someone accesses it again, it can take 50 or more seconds to wake up and respond.

I went looking for a fix and found something genuinely useful: **UptimeRobot**. It is a free service that pings your backend every five minutes, preventing it from going idle and keeping it live and responsive.

## Setting it up

1. Go to uptimerobot.com and sign up with your email.
2. Click **Add New Monitor** from your dashboard.
3. Choose **HTTP(s)** as the monitor type, then paste your backend URL.
4. Set the interval to five minutes, give it a name, and hit **Create Monitor**.
5. That is it. Your backend is now always awake and ready to serve requests.

This little trick has helped me a lot, and I hope it helps you too.

If you know any other smart and free ways to keep backend services always live, I would love to hear them.`,
  },

  {
    slug: 'typescript-in-the-mern-stack',
    title: 'What TypeScript actually changes in a MERN stack',
    excerpt:
      'Static typing, interfaces and better tooling are the headline features. Where they pay off in MERN specifically is more interesting.',
    date: '2025',
    dateISO: '2025-03-01',
    dateIsApproximate: true,
    category: 'Engineering',
    tags: ['TypeScript', 'MERN', 'React', 'JavaScript', 'Web Development'],
    readingMinutes: 2,
    featured: false,
    sourceNote:
      'Adapted from a LinkedIn post shown as roughly a year old on 3 September 2026, so the date above is approximate.',
    body: `I recently dived into TypeScript, and I cannot recommend it enough. Here is why it is becoming a game-changer, especially in the MERN stack.

## What you get

- **Static typing.** Catch errors at compile time, reducing runtime surprises and improving code quality.
- **Interfaces and generics.** Create reusable components with clear contracts, which makes collaboration smoother and code more maintainable.
- **Compatibility.** It integrates with existing JavaScript, allowing gradual adoption. There is no need for a complete rewrite.
- **Better tooling.** Improved IDE support, including autocompletion and code navigation, which means higher productivity.

## Where it pays off in MERN

In the context of MERN specifically, TypeScript shines in three places: it helps manage data structures coming out of MongoDB, it improves API handling in Express.js, and it makes component management in React considerably safer.

If you are looking to level up your web development skills, consider giving TypeScript a try.`,
  },

  {
    slug: 'deepseek-v3-benchmarks',
    title: 'DeepSeek-V3 arrives as a serious GPT-4 competitor',
    excerpt:
      'A Chinese startup released a model that holds its own against GPT-4o and Claude 3.5 Sonnet, particularly on reasoning and coding benchmarks.',
    date: 'Early 2025',
    dateISO: '2025-01-01',
    dateIsApproximate: true,
    category: 'AI',
    tags: ['Artificial Intelligence', 'DeepSeek', 'Machine Learning', 'Benchmarks', 'Tech Trends'],
    readingMinutes: 2,
    featured: false,
    sourceNote:
      'Adapted from a LinkedIn post shown as roughly a year old on 3 September 2026, so the date above is approximate. The figures below are reproduced from the official DeepSeek-V3 comparison table shared with the original post.',
    body: `Recently, a Chinese startup launched an advanced AI model called DeepSeek-V3, which is emerging as a serious competitor to OpenAI's GPT-4.

DeepSeek-V3 has delivered outstanding results in benchmarks, particularly excelling in complex reasoning and coding tasks. While GPT-4 remains a versatile all-rounder, DeepSeek-V3 is making waves with its innovative approach and impressive performance.

## Where it stands out

The comparison table published with the model puts the gap in sharpest relief on competitive programming and mathematics:

| Benchmark | DeepSeek-V3 | Claude 3.5 Sonnet | GPT-4o |
| --- | --- | --- | --- |
| Codeforces (percentile) | 51.6 | 20.3 | 23.6 |
| AIME 2024 (pass@1) | 39.2 | 16.0 | 9.3 |
| MATH-500 (exact match) | 90.2 | 78.3 | 74.6 |
| LiveCodeBench (pass@1) | 37.6 | 32.8 | 34.2 |

It is a mixture-of-experts model with 671 billion total parameters, of which 37 billion are activated per token — which is a large part of why those numbers are reachable at a workable inference cost.

Could this be the start of a new era in AI innovation? Worth keeping an eye on this competition.`,
  },

  {
    slug: 'github-student-developer-pack-tools',
    title: 'Three tools worth claiming from the GitHub Student Developer Pack',
    excerpt:
      'LocalStack, CamberCloud and Requestly — free for students, and each solves a problem you would otherwise pay for or work around.',
    date: 'October 2025',
    dateISO: '2025-10-01',
    dateIsApproximate: true,
    category: 'Tools',
    tags: ['GitHub', 'Students', 'Developer Tools', 'Cloud Computing', 'APIs'],
    readingMinutes: 2,
    featured: false,
    sourceNote:
      'Adapted from a LinkedIn post. The screenshot recorded it as eleven months old on 3 September 2026, so the date above is approximate.',
    body: `GitHub introduced some genuinely useful free tools for student developers through the Student Developer Pack, timed for the new school year.

## The three worth knowing about

- **LocalStack.** Build and test cloud and serverless applications locally, with ease.
- **CamberCloud.** Run simulations, analyse data and train AI models with simple, cloud-based science engines.
- **Requestly.** Debug, mock APIs and test web apps by modifying requests and responses.

Whether you are experimenting, researching, or building your next big project, these tools are there to support your journey.

If you are a student, do not miss out on the GitHub Student Developer Pack. It is free access to some of the best developer tools out there.`,
  },
]

/** Newest first. */
export const blogPostsByDate = [...blogPosts].sort((a, b) => b.dateISO.localeCompare(a.dateISO))

export const featuredPosts = blogPostsByDate.filter((p) => p.featured)

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category))).sort()

export const blogTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort()

/** Related posts: same category first, then shared tags, then recency. */
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug)
  if (!current) return blogPostsByDate.slice(0, limit)

  return blogPostsByDate
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === current.category ? 5 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.dateISO.localeCompare(a.post.dateISO))
    .slice(0, limit)
    .map((s) => s.post)
}
