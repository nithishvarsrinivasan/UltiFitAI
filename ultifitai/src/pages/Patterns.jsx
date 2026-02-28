// =============================================
//  Patterns — Detected Patterns + Predictions
// =============================================

import { Card }        from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'
import { PATTERNS, PREDICTIONS, HISTORY } from '../data/mockData'
import { generateInsights } from '../utils/behavioural'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import styles from './Patterns.module.css'

const insights = generateInsights(HISTORY)

const RISK_STYLE = {
  high: { badge: styles.badgeHigh },
  med:  { badge: styles.badgeMed  },
  low:  { badge: styles.badgeLow  },
}

const radarData = [
  { metric: 'Sleep',     score: 72 },
  { metric: 'Steps',     score: 83 },
  { metric: 'Hydration', score: 58 },
  { metric: 'Mood',      score: 66 },
  { metric: 'Nutrition', score: 62 },
  { metric: 'Gym',       score: 74 },
]

const barData = HISTORY.map((d) => ({
  day:  d.date,
  BSI:  Math.round(
    d.sleep * 8 + d.mood * 7 + (d.steps / 10000) * 25 + d.water * 10
    + (d.gym ? 15 : 0) - (d.junk ? 8 : 0)
  ),
}))

export function Patterns() {
  return (
    <>
      {/* Detected Patterns */}
      <Card title="Detected Behaviour Patterns" icon="🔬">
        {PATTERNS.map((p, i) => (
          <div key={i} className={styles.patternRow}>
            <span className={styles.patternIcon}>{p.icon}</span>
            <div className={styles.patternInfo}>
              <div className={styles.patternName}>{p.name}</div>
              <div className={styles.patternDesc}>{p.desc}</div>
              <div className={styles.method}>Method: {p.method}</div>
            </div>
            <div className={styles.right}>
              <span className={`${styles.riskBadge} ${RISK_STYLE[p.risk].badge}`}>
                {p.risk} risk
              </span>
              <div className={styles.corrLabel}>Confidence</div>
              <div className={styles.corrValue} style={{
                color: p.corr >= 0.8 ? 'var(--red)' : p.corr >= 0.6 ? 'var(--amber)' : 'var(--green)'
              }}>
                {p.corr}
              </div>
            </div>
          </div>
        ))}
      </Card>

      {/* Correlation Insights */}
      <Card title="Correlation Analysis Results" icon="📐">
        <div className={styles.corrGrid}>
          <CorrStat
            label="Sleep → Gym Attendance"
            value={insights.correlations.sleepGym}
            desc="Positive: more sleep = higher gym attendance"
          />
          <CorrStat
            label="Mood → Junk Food"
            value={insights.correlations.moodJunk}
            desc="Negative: lower mood = more junk food"
          />
          <CorrStat
            label="Steps → Hydration"
            value={insights.correlations.stepsWater}
            desc="Negative: more steps paradoxically = less water logged"
          />
        </div>
      </Card>

      {/* Predictive Model Outputs */}
      <Card title="Predictive Model Outputs" icon="🔮">
        {PREDICTIONS.map((p) => (
          <ProgressBar
            key={p.label}
            label={p.label}
            pct={p.pct}
            color={p.color}
            subtitle={`Model: ${p.model}`}
          />
        ))}
        <div className={styles.modelNote}>
          Models updated nightly using behavioural log history.
          Accuracy improves as more data is collected.
        </div>
      </Card>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        <Card title="Behaviour Radar" icon="◎">
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2a2a3e" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
              <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={{ background: '#1a1a26', border: '1px solid #2a2a3e', borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="7-Day BSI Trend" icon="📊">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={barData}>
              <CartesianGrid stroke="#2a2a3e" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ background: '#1a1a26', border: '1px solid #2a2a3e', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="BSI" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}

function CorrStat({ label, value, desc }) {
  const color = Math.abs(value) >= 0.7 ? 'var(--red)' : Math.abs(value) >= 0.5 ? 'var(--amber)' : 'var(--green)'
  return (
    <div className={styles.corrStat}>
      <div className={styles.corrStatValue} style={{ color }}>{value > 0 ? '+' : ''}{value}</div>
      <div className={styles.corrStatLabel}>{label}</div>
      <div className={styles.corrStatDesc}>{desc}</div>
    </div>
  )
}
