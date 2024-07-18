import type { MetadataRoute } from 'next'

import { siteConfig } from '@/content/profile'
import { projects } from '@/content/projects'
import { blogPosts } from '@/content/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/projects', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/certifications', priority: 0.7 },
    { path: '/blog', priority: 0.7 },
    { path: '/resume', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]
}
