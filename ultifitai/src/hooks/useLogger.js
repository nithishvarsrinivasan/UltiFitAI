// =============================================
//  useLogger — Daily Behaviour Logging Hook
//  Handles input, validation & analysis
// =============================================

import { useState, useCallback } from 'react'

const DEFAULT_LOG = {
  sleep:  '',
  steps:  '',
  mood:   '',
  water:  '',
  meals:  '',
  gym:    false,
  junk:   false,
  stress: '',
}

export function useLogger() {
  const [log,       setLog]       = useState(DEFAULT_LOG)
  const [saved,     setSaved]     = useState(false)
  const [analysis,  setAnalysis]  = useState(null)

  const update = useCallback((field, value) => {
    setLog((prev) => ({ ...prev, [field]: value }))
  }, [])

  const analyse = useCallback((logData) => {
    const sleep  = parseFloat(logData.sleep)  || 0
    const mood   = parseInt(logData.mood)     || 5
    const steps  = parseInt(logData.steps?.replace(/,/g, '')) || 0
    const water  = parseFloat(logData.water)  || 0

    // Behaviour Score for the day (simple weighted formula)
    const sleepScore = Math.min((sleep / 8) * 100, 100)
    const moodScore  = (mood / 10) * 100
    const stepScore  = Math.min((steps / 10000) * 100, 100)
    const waterScore = Math.min((water / 2.5) * 100, 100)
    const gymBonus   = logData.gym  ?  15 : 0
    const junkPenalty= logData.junk ? -10 : 0

    const dayBSI = Math.round(
      (sleepScore * 0.3 + moodScore * 0.2 + stepScore * 0.25 + waterScore * 0.25) +
      gymBonus + junkPenalty
    )

    // Predictions based on today's log
    const gymSkipRisk   = sleep < 6.5 ? Math.round(60 + (6.5 - sleep) * 20) : Math.round(30 + Math.max(0, 6.5 - sleep) * 10)
    const junkRisk      = mood < 6 ? Math.round(50 + (6 - mood) * 10) : 30
    const hydrationRisk = steps > 7000 ? Math.round(40 + (steps - 7000) / 200) : 25

    const alerts = []
    if (sleep < 6) alerts.push({ type: 'danger', msg: `Only ${sleep}h sleep — gym skip risk is critically high (${Math.min(gymSkipRisk, 95)}%). OpenClaw recommends a light workout at minimum.` })
    if (mood <= 5)  alerts.push({ type: 'warning', msg: `Mood at ${mood}/10 — junk craving probability elevated. Pre-empt it: prepare a healthy snack before evening.` })
    if (water < 1.5) alerts.push({ type: 'warning', msg: `Only ${water}L hydration logged — below threshold. Drink 500ml now.` })
    if (sleep >= 7 && logData.gym) alerts.push({ type: 'success', msg: `Excellent combo: ${sleep}h sleep + gym session. Your BSI will reflect this positively.` })
    if (!alerts.length) alerts.push({ type: 'info', msg: `Today's log looks solid. Keep it consistent and your BSI will trend up over the week.` })

    return {
      dayBSI:      Math.min(Math.max(dayBSI, 0), 100),
      gymSkipRisk: Math.min(gymSkipRisk, 95),
      junkRisk:    Math.min(junkRisk, 95),
      hydrationRisk,
      alerts,
    }
  }, [])

  const save = useCallback(() => {
    const result = analyse(log)
    setAnalysis(result)
    setSaved(true)
    // In production: POST to backend / local DB
    setTimeout(() => setSaved(false), 4000)
  }, [log, analyse])

  const reset = useCallback(() => {
    setLog(DEFAULT_LOG)
    setAnalysis(null)
    setSaved(false)
  }, [])

  return { log, update, save, saved, analysis, reset }
}
