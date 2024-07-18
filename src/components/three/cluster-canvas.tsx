'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

import { ClusterField } from './cluster-field'
import { useDeviceTier, sceneBudget } from '@/lib/hooks/use-device-tier'
import { useThemeMode } from '@/lib/hooks/use-theme-mode'
import { clamp } from '@/lib/utils'

/**
 * WebGL host for the cluster field.
 *
 * Only ever reached through a dynamic import, so three.js and
 * react-three-fiber stay out of the initial bundle. It also owns the two
 * pieces of shared interaction state — pointer position and scroll progress —
 * writing them into refs so the scene can read them each frame without
 * triggering React renders.
 */
export default function ClusterCanvas({ interactive = true }: { interactive?: boolean }) {
  const tier = useDeviceTier()
  const mode = useThemeMode()
  const prefersReducedMotion = useReducedMotion()
  const pointer = useRef({ x: 0, y: 0 })
  const scrollProgress = useRef(0)

  // Adjustment applied by PerformanceMonitor, relative to the tier's ceiling.
  const [dprAdjustment, setDprAdjustment] = useState(0)

  const animate = interactive && !prefersReducedMotion

  useEffect(() => {
    if (!animate) return

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const onScroll = () => {
      const height = window.innerHeight || 1
      scrollProgress.current = Math.min(window.scrollY / height, 1)
    }

    onScroll()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [animate])

  // Wait for the tier so the field is built once, at the right budget.
  if (!tier) return null

  const [minDpr, maxDpr] = sceneBudget[tier].dpr
  const dpr = clamp(maxDpr + dprAdjustment, minDpr, maxDpr)

  return (
    <Canvas
      dpr={dpr}
      frameloop={animate ? 'always' : 'demand'}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        // The scene is decorative; a lost context must never block the page.
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ position: [0, 0, 15.5], fov: 46, near: 0.1, far: 60 }}
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor
        onDecline={() => setDprAdjustment((current) => current - 0.25)}
        onIncline={() => setDprAdjustment((current) => Math.min(0, current + 0.25))}
      />
      <ClusterField
        tier={tier}
        mode={mode}
        animate={animate}
        pointer={pointer}
        scrollProgress={scrollProgress}
      />
    </Canvas>
  )
}
