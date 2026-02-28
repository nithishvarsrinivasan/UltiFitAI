// =============================================
//  Card — Reusable surface container
// =============================================

import styles from './Card.module.css'

export function Card({ children, title, icon, className = '', style = {} }) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {title && (
        <div className={styles.title}>
          {icon && <span>{icon}</span>}
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
