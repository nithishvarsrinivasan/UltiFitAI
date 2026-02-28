// =============================================
//  Dashboard — BSI Score, Metrics, Nudges, Chart
// =============================================

import { Card }        from '../components/Card'
import { ScoreRing }   from '../components/ScoreRing'
import { Heatmap }     from '../components/Heatmap'
import { DAILY_METRICS, NUDGES, WEEKLY, USER, HISTORY } from '../data/mockData'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import styles from './Dashboard.module.css'

const NUDGE_COLORS = {
  high: { border: '#ef4444', bg: '#ef444415', tag: '#ef4444' },
  med:  { border: '#f59e0b', bg: '#f59e0b15', tag: '#f59e0b' },
  low:  { border: '#10b981', bg: '#10b98115', tag: '#10b981' },
}

const chartData = HISTORY.map((d) => ({
  name:  d.date,
  Sleep: d.sleep,
  Mood:  d.mood,
  Steps: Math.round(d.steps / 1000),
}))

export function Dashboard() {
  return (
    <>
      {/* Top row: BSI + metrics */}
      <Card>
        <div className={styles.topRow}>
          <ScoreRing score={USER.bsi} />
          <div className={styles.metricsBlock}>
            <div className={styles.bsiLabel}>Behaviour Score Index</div>
            <p className={styles.bsiDesc}>
              Composite metric spanning sleep consistency, hydration, workout adherence,
              mood stability, and nutrition patterns. Updated daily by AI.
            </p>
            <div className={styles.metricsGrid}>
              {DAILY_METRICS.map((m) => (
                <div className={styles.metricCard} key={m.label}>
                  <div className={styles.metricLabel}>{m.label}</div>
                  <div className={styles.metricValue} style={{ color: m.color }}>
                    {m.value}
                    {m.unit && <span className={styles.metricUnit}>{m.unit}</span>}
                  </div>
                  <div
                    className={styles.metricTrend}
                    style={{ color: m.up ? '#10b981' : '#ef4444' }}
                  >
                    {m.up ? '↑' : '↓'} {m.trend}
                  </div>
                  <div className={styles.metricBarTrack}>
                    <div
                      className={styles.metricBarFill}
                      style={{ width: `${m.pct}%`, background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 7-day trend chart */}
      <Card title="7-Day Behaviour Trends" icon="📈">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="gMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2a2a3e" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1a1a26', border: '1px solid #2a2a3e', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="Sleep" stroke="#6366f1" fill="url(#gSleep)" strokeWidth={2} dot={{ r: 3, fill: '#6366f1' }} />
            <Area type="monotone" dataKey="Mood"  stroke="#f59e0b" fill="url(#gMood)"  strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ fontSize: 10, color: '#64748b', marginTop: 8, fontFamily: 'JetBrains Mono' }}>
          Sleep (hrs) · Mood (/10) — last 7 days
        </div>
      </Card>

      {/* Active Nudges */}
      <Card title="Active Nudges" icon="⚡">
        {NUDGES.map((n, i) => {
          const c = NUDGE_COLORS[n.urgency] || NUDGE_COLORS.med
          return (
            <div
              key={i}
              className={styles.nudge}
              style={{ borderLeft: `3px solid ${c.border}`, background: c.bg }}
            >
              <div className={styles.nudgeHeader}>
                <span className={styles.nudgeIcon}>{n.icon}</span>
                <span className={styles.nudgeTitle} style={{ color: c.tag }}>{n.title}</span>
                <span className={styles.nudgeTime}>{n.time}</span>
              </div>
              <div className={styles.nudgeMsg}>{n.msg}</div>
            </div>
          )
        })}
      </Card>

      {/* Gym Heatmap */}
      <Card title="Gym Consistency Heatmap" icon="📅">
        <Heatmap />
      </Card>
    </>
  )
}
