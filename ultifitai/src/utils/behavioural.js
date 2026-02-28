// =============================================
//  Behavioural Analytics Utilities
//  Pattern detection, scoring, correlation
// =============================================

import { HISTORY } from '../data/mockData'

/**
 * Compute Behaviour Score Index (BSI) from a log entry
 * Weighted composite metric: sleep, steps, hydration, mood, gym, junk
 */
export function computeBSI({ sleep, steps, mood, water, gym, junk }) {
  const s = parseFloat(sleep)  || 0
  const st= parseInt(steps)    || 0
  const m = parseInt(mood)     || 5
  const w = parseFloat(water)  || 0

  const sleepScore  = Math.min((s / 8)     * 100, 100)
  const stepScore   = Math.min((st / 10000)* 100, 100)
  const moodScore   = (m / 10) * 100
  const waterScore  = Math.min((w / 2.5)   * 100, 100)

  const base   = sleepScore * 0.30 + stepScore * 0.25 + moodScore * 0.20 + waterScore * 0.25
  const bonus  = gym  ? 10 : 0
  const penalty= junk ? -8 : 0

  return Math.round(Math.min(Math.max(base + bonus + penalty, 0), 100))
}

/**
 * Moving average over a numeric array with window size k
 */
export function movingAverage(arr, k = 3) {
  return arr.map((_, i) => {
    const slice = arr.slice(Math.max(0, i - k + 1), i + 1)
    return slice.reduce((a, b) => a + b, 0) / slice.length
  })
}

/**
 * Pearson correlation between two arrays
 */
export function pearsonCorr(x, y) {
  const n   = x.length
  const mx  = x.reduce((a, b) => a + b, 0) / n
  const my  = y.reduce((a, b) => a + b, 0) / n
  const num = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0)
  const den = Math.sqrt(
    x.reduce((s, xi) => s + (xi - mx) ** 2, 0) *
    y.reduce((s, yi) => s + (yi - my) ** 2, 0)
  )
  return den === 0 ? 0 : +(num / den).toFixed(2)
}

/**
 * Streak detection — count consecutive days with condition true
 */
export function streakCount(boolArr) {
  let streak = 0
  for (let i = boolArr.length - 1; i >= 0; i--) {
    if (boolArr[i]) streak++
    else break
  }
  return streak
}

/**
 * Logistic regression prediction (single feature, pre-trained weights)
 * Predicts gym skip probability given hours of sleep
 */
export function predictGymSkip(sleepHours) {
  // w = -1.4, b = 9.2 (fitted on dummy data: skip ↑ as sleep ↓)
  const z = -1.4 * sleepHours + 9.2
  const p = 1 / (1 + Math.exp(-z))
  return Math.round(Math.min(Math.max(p * 100, 5), 95))
}

/**
 * Random Forest proxy — junk craving score based on mood + sleep
 */
export function predictJunkCraving(moodScore, sleepHours) {
  // Simplified feature importance: mood 60%, sleep 40%
  const moodRisk  = (1 - moodScore / 10) * 60
  const sleepRisk = (1 - Math.min(sleepHours, 8) / 8) * 40
  return Math.round(Math.min(moodRisk + sleepRisk + 15, 95))
}

/**
 * Hydration drop risk using moving-average anomaly detection
 */
export function predictHydrationDrop(steps) {
  if (steps < 5000) return 20
  if (steps < 7000) return 35
  if (steps < 9000) return 60
  return 80
}

/**
 * Generate derived insights from historical log
 */
export function generateInsights(history = HISTORY) {
  const sleepArr   = history.map((d) => d.sleep)
  const moodArr    = history.map((d) => d.mood)
  const gymArr     = history.map((d) => d.gym ? 1 : 0)
  const junkArr    = history.map((d) => d.junk ? 1 : 0)
  const waterArr   = history.map((d) => d.water)
  const stepsArr   = history.map((d) => d.steps)

  const sleepGym  = pearsonCorr(sleepArr, gymArr)
  const moodJunk  = pearsonCorr(moodArr, junkArr)
  const stepsWater= pearsonCorr(stepsArr, waterArr)
  const gymStreak = streakCount(history.map((d) => d.gym))

  return {
    correlations: {
      sleepGym,
      moodJunk,
      stepsWater,
    },
    streak: gymStreak,
    avgSleep:  +(sleepArr.reduce((a, b) => a + b, 0) / sleepArr.length).toFixed(1),
    avgMood:   +(moodArr.reduce((a, b) => a + b, 0)  / moodArr.length).toFixed(1),
    avgSteps:  Math.round(stepsArr.reduce((a, b) => a + b, 0) / stepsArr.length),
    avgWater:  +(waterArr.reduce((a, b) => a + b, 0) / waterArr.length).toFixed(1),
    gymRate:   Math.round((gymArr.reduce((a, b) => a + b, 0) / gymArr.length) * 100),
    junkRate:  Math.round((junkArr.reduce((a, b) => a + b, 0) / junkArr.length) * 100),
    movingAvgSleep: movingAverage(sleepArr),
  }
}
