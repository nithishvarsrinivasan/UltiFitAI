// =============================================
//  Heatmap — 12-Week Gym Consistency Grid
// =============================================

import styles from './Heatmap.module.css'

const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKS = 12

// Generate semi-realistic fake data
function generateHeatmapData() {
  // Seed: high on M/W/Thu, low on Tue/Fri/Sun
  const weights = [0.85, 0.30, 0.80, 0.75, 0.25, 0.65, 0.40]
  return weights.map((w) =>
    Array.from({ length: WEEKS }, () => Math.random() < w ? 1 : Math.random() < 0.3 ? 0.5 : 0)
  )
}

const DATA = generateHeatmapData()

function cellColor(v) {
  if (v === 0)   return 'var(--border)'
  if (v <= 0.5)  return '#7c3aed30'
  if (v <= 0.75) return '#7c3aed70'
  return '#7c3aed'
}

export function Heatmap() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {DATA.map((row, di) => (
          <div key={di} className={styles.row}>
            <span className={styles.dayLabel}>{DAYS[di]}</span>
            {row.map((val, wi) => (
              <div
                key={wi}
                className={styles.cell}
                style={{ background: cellColor(val) }}
                title={`${DAYS[di]} W${wi + 1}: ${val === 1 ? 'Gym ✓' : val === 0.5 ? 'Partial' : 'Skipped'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span>← 12-week history</span>
        <div className={styles.legendItems}>
          {['Skipped', 'Partial', 'Completed'].map((l, i) => (
            <div key={l} className={styles.legendItem}>
              <div
                className={styles.legendDot}
                style={{ background: i === 0 ? 'var(--border)' : i === 1 ? '#7c3aed50' : '#7c3aed' }}
              />
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
