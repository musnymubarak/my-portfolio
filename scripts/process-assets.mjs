/**
 * One-off asset pipeline.
 *
 * Reads the raw source material supplied alongside the repository
 * (My_Images, My_Projects, My_Resumes) and emits web-optimised assets into
 * public/. Run with `node scripts/process-assets.mjs`.
 *
 * It prints a manifest of every emitted file with its real pixel dimensions so
 * the content layer can carry accurate width/height and avoid layout shift.
 */
import { mkdir, readdir, writeFile, copyFile, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const OUT_PROJECTS = path.join(ROOT, 'public/images/projects')
const OUT_PROFILE = path.join(ROOT, 'public/images/profile')
const OUT_RESUME = path.join(ROOT, 'public/resume')

/**
 * Maps each source folder to its published slug, and lists the screenshots to
 * publish in gallery order. Files omitted here are deliberately excluded —
 * see the notes below each entry.
 */
const PROJECT_SOURCES = [
  {
    slug: 'daily-grocer',
    dir: 'DailyGrocer',
    files: [
      'Screenshot 2026-09-03 121609.png',
      'Screenshot 2026-09-03 115914.png',
      'Screenshot 2026-09-03 121617.png',
      'Screenshot 2026-09-03 121659.png',
      'Screenshot 2026-09-03 121709.png',
      'Mobile_2.jpeg',
      'Mobile_1.jpeg',
      'Mobile_3.jpeg',
      'Mobile_4.jpeg',
    ],
  },
  { slug: 'sumaiya-college-erp', dir: 'SLAC', files: ['Screenshot 2026-09-03 115451.png'] },
  {
    slug: 'manaveli',
    dir: 'Manaveli',
    // 'Screenshot 2026-09-01 171631.png' is excluded: it is a byte-identical
    // duplicate of a VMA Studio screenshot that was misfiled into this folder.
    files: [
      'Screenshot 2026-09-01 171930.png',
      'Screenshot 2026-09-01 171952.png',
      'Screenshot 2026-09-01 172009.png',
      'Screenshot 2026-09-01 172022.png',
      'Screenshot 2026-09-01 172047.png',
    ],
  },
  {
    slug: 'blue-ocean-adventures',
    dir: 'Blue_Ocean',
    files: [
      'Screenshot 2026-09-02 111308.png',
      'Screenshot 2026-09-02 111340.png',
      'Screenshot 2026-09-02 111356.png',
      'Screenshot 2026-09-02 111409.png',
    ],
  },
  {
    slug: 'luwenza',
    dir: 'Luwenza',
    files: [
      'Screenshot 2026-09-02 112926.png',
      'Screenshot 2026-09-02 112946.png',
      'Screenshot 2026-09-02 112957.png',
      'Screenshot 2026-09-02 113015.png',
      'Screenshot 2026-09-02 113038.png',
    ],
  },
  {
    slug: 'vma-studio',
    dir: 'VMA',
    files: [
      'Screenshot 2026-09-01 171618.png',
      'Screenshot 2026-09-01 171631.png',
      'Screenshot 2026-09-01 171647.png',
    ],
  },
  {
    slug: 'wakeup-health',
    dir: 'WakeUP_Health',
    files: [
      'Screenshot 2026-09-01 182118.png',
      'Screenshot 2026-09-01 182139.png',
      'Screenshot 2026-09-01 182153.png',
      'Screenshot 2026-09-01 182205.png',
      'Screenshot 2026-09-01 182223.png',
    ],
  },
  {
    slug: 'lancan-immigration',
    dir: 'LanCan',
    files: [
      'Screenshot 2026-09-01 170001.png',
      'Screenshot 2026-09-01 170033.png',
      'Screenshot 2026-09-01 170112.png',
    ],
  },
  {
    slug: 'aeonic-bio',
    dir: 'Aeonic_Bio',
    files: [
      'Screenshot 2026-09-01 182614.png',
      'Screenshot 2026-09-01 182633.png',
      'Screenshot 2026-09-01 182650.png',
    ],
  },
  {
    slug: 'kasis-chicken',
    dir: "Kasi's Chicken",
    files: [
      'Screenshot 2026-09-01 165442.png',
      'Screenshot 2026-09-01 165449.png',
      'Screenshot 2026-09-01 165514.png',
    ],
  },
]

const RESUMES = [
  { from: 'Mohamed_Musni_DevOps_CV.pdf', to: 'Mohamed-Musni-DevOps-Engineer-CV.pdf' },
  { from: 'Musny_Resume_SE.pdf', to: 'Mohamed-Musni-Software-Engineer-CV.pdf' },
  { from: 'Musny_CV_FS.pdf', to: 'Mohamed-Musni-Full-Stack-CV.pdf' },
]

const manifest = { projects: {}, profile: [], resumes: [] }

async function emptyDir(dir) {
  if (existsSync(dir)) await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })
}

/** Writes a WebP capped at maxWidth and returns its real emitted dimensions. */
async function toWebp(srcPath, destPath, maxWidth, quality = 80) {
  const info = await sharp(srcPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(destPath)
  return { width: info.width, height: info.height }
}

async function processProjects() {
  await emptyDir(OUT_PROJECTS)

  for (const project of PROJECT_SOURCES) {
    const srcDir = path.join(ROOT, 'My_Projects', project.dir)
    const destDir = path.join(OUT_PROJECTS, project.slug)
    await mkdir(destDir, { recursive: true })

    const available = new Set(await readdir(srcDir))
    const entries = []

    for (const [index, file] of project.files.entries()) {
      if (!available.has(file)) {
        console.error(`  ! MISSING ${project.dir}/${file}`)
        continue
      }
      const srcPath = path.join(srcDir, file)
      const base = `${String(index + 1).padStart(2, '0')}`
      const meta = await sharp(srcPath).metadata()
      const isPortrait = (meta.height ?? 0) > (meta.width ?? 0)
      // Phone captures stay near their native width; desktop shots cap at 1600.
      const maxWidth = isPortrait ? 720 : 1600
      const dest = path.join(destDir, `${base}.webp`)
      const dims = await toWebp(srcPath, dest, maxWidth, isPortrait ? 82 : 78)
      const bytes = (await stat(dest)).size
      entries.push({
        src: `/images/projects/${project.slug}/${base}.webp`,
        source: file,
        width: dims.width,
        height: dims.height,
        orientation: isPortrait ? 'portrait' : 'landscape',
        kb: Math.round(bytes / 1024),
      })
    }

    manifest.projects[project.slug] = entries
    const totalKb = entries.reduce((sum, e) => sum + e.kb, 0)
    console.log(`  ${project.slug}: ${entries.length} images, ${totalKb} KB`)
  }
}

async function processProfile() {
  await emptyDir(OUT_PROFILE)
  const src = path.join(ROOT, 'My_Images/Hero.png')

  // Next/Image re-encodes whatever it is given, so these are masters, not
  // delivery files: near-lossless and at full source resolution, leaving the
  // optimiser room to downscale once rather than compounding compression.
  // Nothing here is served directly.
  const MASTER_QUALITY = 94

  const portraitDest = path.join(OUT_PROFILE, 'portrait.webp')
  const portraitInfo = await sharp(src)
    .webp({ quality: MASTER_QUALITY, effort: 6 })
    .toFile(portraitDest)
  manifest.profile.push({
    src: '/images/profile/portrait.webp',
    width: portraitInfo.width,
    height: portraitInfo.height,
    kb: Math.round((await stat(portraitDest)).size / 1024),
    role: 'master — square portrait',
  })

  // Tight head-and-shoulders crop for avatars, measured from the source:
  // head centre sits at x≈54%, eye line at y≈41%.
  const avatarCrop = { left: 242, top: 143, width: 874, height: 875 }
  const avatarDest = path.join(OUT_PROFILE, 'avatar.webp')
  const avatarInfo = await sharp(src)
    .extract(avatarCrop)
    .webp({ quality: MASTER_QUALITY, effort: 6 })
    .toFile(avatarDest)
  manifest.profile.push({
    src: '/images/profile/avatar.webp',
    width: avatarInfo.width,
    height: avatarInfo.height,
    kb: Math.round((await stat(avatarDest)).size / 1024),
    role: 'master — avatar crop',
  })

  for (const p of manifest.profile) {
    console.log(`  ${p.src} ${p.width}x${p.height} ${p.kb ?? '?'} KB  (${p.role})`)
  }
}

async function processResumes() {
  await mkdir(OUT_RESUME, { recursive: true })
  for (const r of RESUMES) {
    const src = path.join(ROOT, 'My_Resumes', r.from)
    if (!existsSync(src)) {
      console.error(`  ! MISSING resume ${r.from}`)
      continue
    }
    const dest = path.join(OUT_RESUME, r.to)
    await copyFile(src, dest)
    const bytes = (await stat(dest)).size
    manifest.resumes.push({ file: `/resume/${r.to}`, kb: Math.round(bytes / 1024) })
    console.log(`  ${r.to} ${Math.round(bytes / 1024)} KB`)
  }
}

console.log('Projects:')
await processProjects()
console.log('Profile:')
await processProfile()
console.log('Resumes:')
await processResumes()

await writeFile(
  path.join(ROOT, 'scripts/asset-manifest.json'),
  JSON.stringify(manifest, null, 2),
)
console.log('\nWrote scripts/asset-manifest.json')
