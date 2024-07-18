# Mohamed Musni — portfolio

A portfolio for a software engineer working across backend services and the
infrastructure they deploy to. Built with Next.js 16, React 19, TypeScript,
Tailwind CSS 4 and a react-three-fiber scene.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint
```

Node 20.9 or newer is required.

## Environment

Copy `.env.example` to `.env.local`. Everything there is optional: without it
the site builds and runs in full, and the contact form reports that it is not
configured and points visitors at the direct email address instead.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com), used to deliver contact-form messages |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in that Resend account |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered; defaults to the address in `src/content/profile.ts` |

## Before deploying

Set the production domain in `src/content/profile.ts`:

```ts
export const siteConfig = {
  url: 'https://musny.netlify.app',   // <- change this
}
```

It is the single source of truth for canonical URLs, the sitemap, Open Graph
tags and the article share links.

## Editing the content

No copy lives inside a component. Everything is typed data in `src/content`:

| File | Holds |
| --- | --- |
| `profile.ts` | Name, positioning, contact details, social links, résumé variants, navigation, site config |
| `experience.ts` | Roles, education, career timeline |
| `skills.ts` | Skill groups; `level` records how each skill is evidenced, not a self-rating |
| `projects.ts` | Project database, including case-study sections, galleries and links |
| `certifications.ts` | Credly credentials with their verification URLs |
| `blog.ts` | Articles, written in a small Markdown subset |
| `types.ts` | The shared content model |

Adding a project or an article means adding an object to the relevant array.
Routes, metadata, sitemap entries, filters and related-item logic all derive
from that data.

### Article formatting

`blog.ts` bodies support `##` headings, `-` bullets, numbered lists, pipe
tables, `**bold**` and `` `code` ``. The renderer is
`src/components/blog/article-body.tsx` — a deliberately small parser, since the
content is authored in this repository and never comes from an untrusted
source.

## Assets

Source material lives in the untracked folders at the repository root
(`My_Projects`, `My_Images`, `My_Resumes`). `scripts/process-assets.mjs`
converts it into optimised WebP and copies the published résumés:

```bash
node scripts/process-assets.mjs
```

It prints a manifest with the real pixel dimensions of every emitted file, which
is what the content layer records so images never cause layout shift. The
excluded and renamed files are documented in the script.

## Selected work layout

The home page lists projects as an index rather than a grid of cards
(`src/components/home/work-index.tsx`). Six names in one column can be read in a
single pass, where six cards have to be scanned one at a time.

On wide screens a pinned panel previews the active project, driven by hover
**and** focus so a keyboard reaches every preview. Narrow screens drop the panel
and give each project its own inline image, because hover does not exist on
touch and a preview nobody can trigger is dead weight. Without JavaScript every
row still renders in full with a working link.

Project accent colours are sampled from client branding, so they are used for
rules, washes and icons but never for small text — several of them fall below AA
at that size. `/projects` keeps a grid, which suits browsing and filtering.

## The 3D scene

`src/components/three` holds a cluster topology — nodes across three concentric
shells with links between near neighbours, standing in for a distributed
system. It reacts to cursor position and scroll.

Notes on how it stays cheap:

- three.js is always behind a dynamic import, so it never blocks first paint,
  and its chunk is served with a one-year immutable cache.
- Node and link counts are chosen per device tier in
  `src/lib/hooks/use-device-tier.ts`. Phones get a simplified scene rather than
  a shrunken desktop one, and skip WebGL altogether on inner pages.
- `PerformanceMonitor` lowers the device pixel ratio if the frame rate drops.
- Under `prefers-reduced-motion` the scene renders a single static frame.
- The CSS fallback behind it is a finished visual, not a spinner, so a visitor
  without WebGL still sees a complete page.

## Theming

Both themes come from a single token block in `globals.css`. Every colour is
declared once with `light-dark()`, which resolves against the computed
`color-scheme`, so there is no duplicated palette to keep in sync.

The ramp keeps its ROLE rather than its lightness across themes: `base-950` is
always the page, `base-900` always a raised card, `ink-100` always the strongest
text. That is why switching themes needed no component rewrites. `--hairline`
and the surface tokens derive from `ink-100` and `base-*`, so they invert for
free.

Three states, in `src/components/layout/theme-toggle.tsx`:

- **System** is the default and needs no JavaScript. CSS resolves it through
  `prefers-color-scheme`, so there is no flash and nothing to hydrate.
- **Light** and **Dark** set `data-theme` on the root, which pins
  `color-scheme` and flips every token at once. The choice is stored in
  `localStorage` and reapplied before paint by a small script at the top of
  `<body>`.

Jade does not survive a white background — `#2dd4a7` sits near 1.8:1 there — so
the light theme uses a deeper jade of the same hue. Every foreground was checked
against every surface it can appear on: 1,527 rendered text elements per theme,
all at or above WCAG AA.

The WebGL scene cannot read CSS custom properties, so it reads the resolved
theme through `useThemeMode` and switches both palette and blending. Additive
blending only ever adds light, which erases the scene on white, so the light
theme draws normally with deeper colours instead.

## Motion and no-JS behaviour

Scroll reveals are CSS. The hidden starting state applies only under
`@media (scripting: enabled)`, so with JavaScript disabled every section simply
renders rather than waiting on an observer that will never run. The server and
client emit identical markup, so a reduced-motion preference cannot cause a
hydration mismatch.

`src/components/motion/reveal-observer.tsx` drives them with two mechanisms,
both needed:

- an `IntersectionObserver` for the common case of a section scrolling into
  view, which produces the staggered entrance;
- a scroll and resize sweep for sections a jump skipped over. An
  `IntersectionObserver` only fires on a threshold crossing, so a scroll that
  moves a section from below the viewport to above it — scroll restoration on
  reload, an anchor link, Ctrl+End — produces no callback at all, and without
  the sweep that content would stay invisible.

## Content provenance

Every fact on the site traces to a supplied document. Where a source is silent,
the UI omits the field rather than filling it in:

- there is no research or publications section, because the source material
  contains none;
- blog publication dates are marked approximate, because the LinkedIn
  screenshots record relative ages rather than dates, and structured data omits
  a publication date rather than asserting one;
- project technology lists reproduce what each brief states, and case studies
  describe observed product behaviour rather than guessing at an implementation.
