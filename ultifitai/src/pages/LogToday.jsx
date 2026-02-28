// =============================================
//  LogToday — Daily Behaviour Input Form
// =============================================

import { Card }        from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'
import { useLogger }   from '../hooks/useLogger'
import styles          from './LogToday.module.css'

const ALERT_STYLE = {
  danger:  { bg: '#ef444415', border: '#ef4444', icon: '🔴' },
  warning: { bg: '#f59e0b15', border: '#f59e0b', icon: '🟡' },
  success: { bg: '#10b98115', border: '#10b981', icon: '🟢' },
  info:    { bg: '#7c3aed15', border: '#7c3aed', icon: '💡' },
}

export function LogToday() {
  const { log, update, save, saved, analysis } = useLogger()

  return (
    <div className={styles.wrap}>
      {/* Form */}
      <Card title="Daily Behaviour Log" icon="✦" style={{ maxWidth: 640 }}>
        <div className={styles.grid2}>
          <Field label="Sleep Duration (hrs)" type="number" placeholder="e.g. 7.5"
            value={log.sleep} onChange={(v) => update('sleep', v)} />
          <Field label="Steps Today" type="number" placeholder="e.g. 8000"
            value={log.steps} onChange={(v) => update('steps', v)} />
          <Field label="Mood Score (1–10)" type="number" placeholder="e.g. 7"
            value={log.mood} onChange={(v) => update('mood', v)} min="1" max="10" />
          <Field label="Water Intake (L)" type="number" placeholder="e.g. 2.0"
            value={log.water} onChange={(v) => update('water', v)} />
        </div>

        <Field label="Meals Today (describe freely)"
          placeholder="e.g. oats + banana, chicken rice, apple"
          value={log.meals} onChange={(v) => update('meals', v)} />

        <Field label="Stress Level (1–10)" type="number" placeholder="e.g. 4"
          value={log.stress} onChange={(v) => update('stress', v)} min="1" max="10" />

        <div className={styles.checkRow}>
          <CheckBox
            label="✅ Worked out today"
            checked={log.gym}
            onChange={(v) => update('gym', v)}
            color="var(--green)"
          />
          <CheckBox
            label="🍔 Had junk food"
            checked={log.junk}
            onChange={(v) => update('junk', v)}
            color="var(--red)"
          />
        </div>

        <button
          className={`${styles.btn} ${saved ? styles.btnSaved : ''}`}
          onClick={save}
        >
          {saved ? '✓ Logged & Analysed by AI' : '⬡ Log & Analyse with AI'}
        </button>
      </Card>

      {/* AI Analysis Output */}
      {analysis && (
        <Card title="AI Analysis" icon="🧠" style={{ maxWidth: 640 }}>
          <div className={styles.bsiRow}>
            <div>
              <div className={styles.dayBsiLabel}>Today's BSI</div>
              <div
                className={styles.dayBsiScore}
                style={{
                  color: analysis.dayBSI >= 70 ? 'var(--green)' :
                         analysis.dayBSI >= 50 ? 'var(--amber)' : 'var(--red)'
                }}
              >
                {analysis.dayBSI}<span style={{ fontSize: 16 }}>/100</span>
              </div>
            </div>
            <div className={styles.predsBlock}>
              <ProgressBar label="Gym Skip Risk"  pct={analysis.gymSkipRisk}   color="var(--amber)" />
              <ProgressBar label="Junk Craving"   pct={analysis.junkRisk}      color="var(--red)"   />
              <ProgressBar label="Hydration Drop" pct={analysis.hydrationRisk} color="var(--cyan)"  />
            </div>
          </div>

          <div className={styles.alerts}>
            {analysis.alerts.map((a, i) => {
              const s = ALERT_STYLE[a.type] || ALERT_STYLE.info
              return (
                <div
                  key={i}
                  className={styles.alert}
                  style={{ background: s.bg, borderLeft: `3px solid ${s.border}` }}
                >
                  <span>{s.icon}</span>
                  <span className={styles.alertMsg}>{a.msg}</span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

function Field({ label, type = 'text', placeholder, value, onChange, min, max }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 5, fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        min={min} max={max}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '8px 12px',
          color: 'var(--text)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          outline: 'none',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}

function CheckBox({ label, checked, onChange, color }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 16, height: 16, accentColor: color }}
      />
      {label}
    </label>
  )
}
