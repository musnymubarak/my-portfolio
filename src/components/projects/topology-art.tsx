/**
 * Stand-in artwork for projects with no screenshots.
 *
 * The infrastructure work — DevBoard, the n8n platform, the POS deployment —
 * has no user interface to photograph. Rather than leave a hole, those entries
 * get a small node graph in the project's own accent colour, echoing the
 * cluster topology in the hero so the gap reads as part of the design.
 */
const NODES = [
  [18, 30],
  [50, 16],
  [82, 32],
  [34, 56],
  [66, 54],
  [50, 80],
  [14, 72],
  [86, 74],
] as const

const EDGES = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [3, 6],
  [4, 7],
  [5, 6],
  [5, 7],
] as const

export function TopologyArt({ accent, className }: { accent: string; className?: string }) {
  const id = `topology-${accent.replace('#', '')}`

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className ?? 'size-full'}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#${id})`} />

      {EDGES.map(([a, b], index) => {
        const from = NODES[a]
        const to = NODES[b]
        if (!from || !to) return null
        return (
          <line
            key={index}
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke={accent}
            strokeWidth="0.35"
            strokeOpacity="0.4"
          />
        )
      })}

      {NODES.map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r={index < 3 ? 2 : 1.4} fill={accent} fillOpacity="0.9" />
          <circle cx={x} cy={y} r={index < 3 ? 4.5 : 3} fill={accent} fillOpacity="0.16" />
        </g>
      ))}
    </svg>
  )
}
