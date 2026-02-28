// =============================================
//  Layout — App Shell: Header + Sidebar
// =============================================

import styles from './Layout.module.css'

const NAV = [
  { icon: '⬡', label: 'Dashboard' },
  { icon: '✦', label: 'Log Today' },
  { icon: '◈', label: 'AI Coach' },
  { icon: '◎', label: 'Patterns' },
  { icon: '▦', label: 'Weekly Report' },
]

export function Layout({ children, activeTab, setActiveTab, predictions }) {
  return (
    <div className={styles.shell}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>🧠</div>
          <div>
            <div className={styles.logoText}>BehaviourAI</div>
            <div className={styles.logoSub}>POWERED BY AI</div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.statusDot} />
          <span className={styles.statusText}>AI ACTIVE</span>
          <div className={styles.divider} />
          <span className={styles.userChip}>Rajan · BSI 74</span>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {NAV.map((item) => (
            <button
              key={item.label}
              className={`${styles.navItem} ${activeTab === item.label ? styles.navActive : ''}`}
              onClick={() => setActiveTab(item.label)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Today's Prediction Mini-Panel */}
          <div className={styles.predPanel}>
            <div className={styles.predTitle}>Today's Risks</div>
            {predictions.map((p) => (
              <div key={p.label} className={styles.predRow}>
                <span className={styles.predLabel}>{p.label}</span>
                <div className={styles.predBar}>
                  <div
                    className={styles.predFill}
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
                <span className={styles.predPct} style={{ color: p.color }}>
                  {p.pct}%
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
