import { ImageResponse } from 'next/og'

import { profile } from '@/content/profile'

export const alt = `${profile.name} — ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social card. Rendered at build time with the site's own palette so a shared
 * link looks like the site it points at. Kept to system fonts and flat colour
 * so it needs no network fetch.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#05070a',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Signal glow, echoing the cluster field on the site. */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(45,212,167,0.20) 0%, rgba(5,7,10,0) 65%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: '#2dd4a7',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#8f98a8',
              display: 'flex',
            }}
          >
            {profile.disciplines.join('  /  ')}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#f3f5f8',
              letterSpacing: -3,
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              color: '#b9c0cd',
              lineHeight: 1.35,
              maxWidth: 900,
              display: 'flex',
            }}
          >
            {profile.positioning}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(243,245,248,0.12)',
            paddingTop: 28,
            fontSize: 24,
            color: '#6f7889',
          }}
        >
          <div style={{ display: 'flex' }}>
            {profile.currentRole.title} · {profile.currentRole.company}
          </div>
          <div style={{ display: 'flex', color: '#2dd4a7' }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  )
}
