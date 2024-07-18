'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import type { DeviceTier } from '@/lib/hooks/use-device-tier'
import type { ThemeMode } from '@/lib/hooks/use-theme-mode'
import { sceneBudget } from '@/lib/hooks/use-device-tier'

/**
 * "Control plane" — an interactive cluster topology.
 *
 * Nodes are distributed across three concentric shells using a Fibonacci
 * spiral, so the field reads as a structured distributed system rather than
 * random noise: an inner control plane, a working tier, and a sparse edge.
 * Links connect nodes that fall within a distance threshold, which produces
 * the dense core and thin periphery of a real service topology.
 *
 * Everything is generated once into typed arrays and rendered as a single
 * points draw call plus a single line draw call.
 */

const SHELLS = [
  { radius: 3.4, share: 0.22, spread: 0.25 },
  { radius: 6.1, share: 0.46, spread: 0.55 },
  { radius: 8.9, share: 0.32, spread: 0.9 },
] as const

/**
 * The scene needs two palettes, because it also needs two blending modes.
 * On the dark ground the points are drawn additively, so they must be bright
 * to register. Additive blending only ever adds light, which on a white ground
 * pushes everything toward white and erases the scene, so the light theme
 * draws normally with deeper, denser colours instead.
 */
const PALETTES = {
  dark: {
    signal: new THREE.Color('#2dd4a7'),
    bright: new THREE.Color('#a5f3dc'),
    neutral: new THREE.Color('#7d8695'),
    attention: new THREE.Color('#f5b544'),
  },
  light: {
    signal: new THREE.Color('#0a8f6c'),
    bright: new THREE.Color('#07795b'),
    neutral: new THREE.Color('#93a0b2'),
    attention: new THREE.Color('#c2801a'),
  },
} as const

/** Deterministic pseudo-random so the layout is identical on every render. */
function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

interface FieldData {
  positions: Float32Array
  colors: Float32Array
  scales: Float32Array
  phases: Float32Array
  linkPositions: Float32Array
  linkColors: Float32Array
  count: number
}

function buildField(nodeCount: number, maxLinks: number, mode: ThemeMode): FieldData {
  const palette = PALETTES[mode]
  const random = createRandom(20260903)

  const positions = new Float32Array(nodeCount * 3)
  const colors = new Float32Array(nodeCount * 3)
  const scales = new Float32Array(nodeCount)
  const phases = new Float32Array(nodeCount)

  let index = 0
  for (const shell of SHELLS) {
    const shellCount = Math.round(nodeCount * shell.share)
    const golden = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < shellCount && index < nodeCount; i++, index++) {
      // Fibonacci sphere gives even angular coverage without clumping.
      const y = 1 - (i / Math.max(shellCount - 1, 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i

      const jitter = () => (random() - 0.5) * shell.spread
      const r = shell.radius + (random() - 0.5) * shell.spread * 2

      positions[index * 3] = Math.cos(theta) * radiusAtY * r + jitter()
      // Flatten vertically so the field reads as a disc-like cluster rather
      // than a perfect ball, which sits better behind headline text.
      positions[index * 3 + 1] = y * r * 0.62 + jitter()
      positions[index * 3 + 2] = Math.sin(theta) * radiusAtY * r + jitter()

      const roll = random()
      const color =
        roll > 0.965
          ? palette.attention
          : roll > 0.82
            ? palette.bright
            : roll > 0.42
              ? palette.signal
              : palette.neutral

      colors[index * 3] = color.r
      colors[index * 3 + 1] = color.g
      colors[index * 3 + 2] = color.b

      // Inner-shell nodes render slightly larger, reinforcing the hierarchy.
      scales[index] = (shell.radius < 4 ? 1.5 : 0.7 + random() * 0.7) * (roll > 0.965 ? 1.4 : 1)
      phases[index] = random()
    }
  }

  const count = index

  // Link pass: connect nodes within a threshold, sampling candidate pairs so
  // this stays O(n · k) rather than O(n²) on the desktop budget.
  const linkA: number[] = []
  const threshold = 2.15
  const thresholdSq = threshold * threshold
  const neighbourWindow = 26

  for (let i = 0; i < count && linkA.length / 2 < maxLinks; i++) {
    const ax = positions[i * 3] ?? 0
    const ay = positions[i * 3 + 1] ?? 0
    const az = positions[i * 3 + 2] ?? 0

    for (let step = 1; step <= neighbourWindow; step++) {
      const j = i + step
      if (j >= count) break
      const bx = positions[j * 3] ?? 0
      const by = positions[j * 3 + 1] ?? 0
      const bz = positions[j * 3 + 2] ?? 0

      const dx = ax - bx
      const dy = ay - by
      const dz = az - bz
      const distSq = dx * dx + dy * dy + dz * dz

      if (distSq < thresholdSq) {
        linkA.push(i, j)
        if (linkA.length / 2 >= maxLinks) break
      }
    }
  }

  const linkCount = linkA.length / 2
  const linkPositions = new Float32Array(linkCount * 6)
  const linkColors = new Float32Array(linkCount * 6)

  for (let l = 0; l < linkCount; l++) {
    const i = linkA[l * 2] ?? 0
    const j = linkA[l * 2 + 1] ?? 0

    for (let axis = 0; axis < 3; axis++) {
      linkPositions[l * 6 + axis] = positions[i * 3 + axis] ?? 0
      linkPositions[l * 6 + 3 + axis] = positions[j * 3 + axis] ?? 0
    }

    // Links fade toward the outer shell so the core reads as denser.
    const distanceFromCentre = Math.hypot(
      positions[i * 3] ?? 0,
      positions[i * 3 + 1] ?? 0,
      positions[i * 3 + 2] ?? 0,
    )
    const intensity = THREE.MathUtils.clamp(1 - distanceFromCentre / 11, 0.08, 1)

    const signalChannels = [palette.signal.r, palette.signal.g, palette.signal.b]
    for (let axis = 0; axis < 3; axis++) {
      const channel = (signalChannels[axis] ?? 0) * intensity
      linkColors[l * 6 + axis] = channel
      linkColors[l * 6 + 3 + axis] = channel * 0.55
    }
  }

  return { positions, colors, scales, phases, linkPositions, linkColors, count }
}

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uSize;

  varying vec3 vColor;
  varying float vPulse;
  varying float vDepth;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + aPhase * 6.2831853);
    vPulse = pulse;
    vColor = aColor;
    vDepth = -mvPosition.z;

    gl_PointSize = uSize * aScale * (1.0 + pulse * 0.4) * (300.0 / max(-mvPosition.z, 0.001));
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vPulse;
  varying float vDepth;

  uniform float uOpacity;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.0, dist);
    // Fade with distance so the far side of the cluster recedes.
    float depthFade = 1.0 - smoothstep(9.0, 26.0, vDepth);
    float alpha = pow(core, 3.0) * (0.45 + vPulse * 0.55) * depthFade * uOpacity;

    gl_FragColor = vec4(vColor, alpha);

    #include <colorspace_fragment>
  }
`

/** Point size multiplier, tuned per device tier. */
function pointSizeFor(tier: DeviceTier): number {
  return tier === 'mobile' ? 0.52 : 0.38
}

interface ClusterFieldProps {
  tier: DeviceTier
  /** Drives the palette and blending mode. */
  mode: ThemeMode
  /** When false the field renders a single static frame. */
  animate: boolean
  /** Normalised pointer position, -1 to 1 on both axes. */
  pointer: React.RefObject<{ x: number; y: number }>
  /** 0 at the top of the page, 1 once the hero has scrolled away. */
  scrollProgress: React.RefObject<number>
}

export function ClusterField({ tier, mode, animate, pointer, scrollProgress }: ClusterFieldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const { invalidate } = useThree()

  const budget = sceneBudget[tier]
  const field = useMemo(
    () => buildField(budget.nodes, budget.links, mode),
    [budget.nodes, budget.links, mode],
  )
  const isLight = mode === 'light'

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(field.positions.subarray(0, field.count * 3), 3),
    )
    geometry.setAttribute(
      'aColor',
      new THREE.BufferAttribute(field.colors.subarray(0, field.count * 3), 3),
    )
    geometry.setAttribute('aScale', new THREE.BufferAttribute(field.scales.subarray(0, field.count), 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(field.phases.subarray(0, field.count), 1))
    return geometry
  }, [field])

  const linksGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(field.linkPositions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(field.linkColors, 3))
    return geometry
  }, [field])

  // Created once and handed to the material. It is never mutated during
  // render — every per-frame write goes through the material ref inside
  // useFrame, which is the sanctioned place for three.js state.
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    // Nodes should read as crisp points, not soft blobs. With the 300/distance
    // attenuation and a camera at z≈15.5, this lands each node at roughly
    // 5–12 physical pixels.
    uSize: { value: pointSizeFor(tier) },
    uOpacity: { value: 1 },
  }))

  // The point size is the only uniform that depends on a prop.
  useEffect(() => {
    const material = pointsMaterialRef.current
    if (material) material.uniforms['uSize']!.value = pointSizeFor(tier)
  }, [tier])

  // Geometries are created outside React's reconciler, so dispose them by hand
  // when the budget changes or the scene unmounts.
  useEffect(() => {
    return () => {
      pointsGeometry.dispose()
      linksGeometry.dispose()
    }
  }, [pointsGeometry, linksGeometry])

  // A static scene still needs one frame drawn after mount.
  useEffect(() => {
    if (!animate) invalidate()
  }, [animate, invalidate])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    // Guard against long frames after a background tab regains focus.
    const step = Math.min(delta, 0.05)

    const material = pointsMaterialRef.current

    if (animate) {
      if (material) material.uniforms['uTime']!.value += step
      group.rotation.y += step * 0.045

      const target = pointer.current ?? { x: 0, y: 0 }
      // Damped parallax: the cluster leans toward the cursor rather than
      // snapping to it.
      group.rotation.x += (target.y * 0.22 - group.rotation.x) * Math.min(step * 2.4, 1)
      group.position.x += (target.x * 0.9 - group.position.x) * Math.min(step * 2.4, 1)

      const progress = scrollProgress.current ?? 0
      const targetZ = progress * -5
      group.position.z += (targetZ - group.position.z) * Math.min(step * 2.2, 1)
      if (material) material.uniforms['uOpacity']!.value = 1 - progress * 0.75
    } else {
      group.rotation.x = 0.12
      group.rotation.y = 0.6
    }

    if (material) material.uniformsNeedUpdate = true
    void state
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={pointsMaterialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </points>

      <lineSegments geometry={linksGeometry} frustumCulled={false}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={isLight ? (tier === 'mobile' ? 0.5 : 0.62) : tier === 'mobile' ? 0.24 : 0.34}
          depthWrite={false}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}
