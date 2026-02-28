// =============================================
//  ScoreRing — Animated SVG Behaviour Score
// =============================================

export function ScoreRing({ score, size = 130 }) {
  const r    = 48
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ

  const color =
    score >= 75 ? '#10b981' :
    score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      style={{ flexShrink: 0, animation: 'float 4s ease-in-out infinite' }}
    >
      <defs>
        <linearGradient id="bsiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Track */}
      <circle cx="60" cy="60" r={r} fill="none" stroke="#2a2a3e" strokeWidth="8" />

      {/* Fill */}
      <circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke="url(#bsiGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circ}`}
        transform="rotate(-90 60 60)"
        style={{ transition: 'stroke-dasharray 1.2s ease' }}
      />

      {/* Score label */}
      <text
        x="60" y="53"
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="24"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
      >
        {score}
      </text>
      <text
        x="60" y="68"
        textAnchor="middle"
        fill="#64748b"
        fontSize="8.5"
        fontFamily="'Space Grotesk', sans-serif"
        letterSpacing="1"
      >
        BSI SCORE
      </text>
      <text
        x="60" y="80"
        textAnchor="middle"
        fill={color}
        fontSize="8"
        fontFamily="'Space Grotesk', sans-serif"
      >
        {score >= 75 ? '● Good' : score >= 50 ? '● Moderate' : '● Low'}
      </text>
    </svg>
  )
}
