import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'

import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PageTransition } from '@/components/layout/page-transition'
import { RevealObserver } from '@/components/motion/reveal-observer'
import { profile, siteConfig } from '@/content/profile'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-sora',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.positioning,
  applicationName: siteConfig.name,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  keywords: [
    'Mohamed Musni',
    'Musny Mubarak',
    'Software Engineer',
    'DevOps Engineer',
    'Kubernetes',
    'Terraform',
    'FastAPI',
    'Next.js',
    'Sri Lanka',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.positioning,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#05070a' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/*
          Applies a saved theme choice before the page paints. Only runs for
          visitors who picked a theme explicitly: the default follows the
          operating system through CSS alone, so most people never execute it.
          Placed at the top of <body> rather than in <head>, where browser
          extensions commonly inject their own scripts and disturb hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('musny-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />

        <a
          href="#main"
          className="sr-only-focusable focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:h-auto focus:w-auto focus:rounded-full focus:bg-signal-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-base-950 focus:[clip-path:none]"
        >
          Skip to content
        </a>

        <RevealObserver />

        <SiteHeader />

        <main id="main" className="flex-1 pt-16 sm:pt-18">
          <PageTransition>{children}</PageTransition>
        </main>

        <SiteFooter />
      </body>
    </html>
  )
}
