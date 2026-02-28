// =============================================
//  ProgressBar — Labelled progress bar
// =============================================

import styles from './ProgressBar.module.css'

export function ProgressBar({ label, pct, color, subtitle }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value} style={{ color }}>{pct}%</span>
      </div>
      {subtitle && <div className={styles.sub}>{subtitle}</div>}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
