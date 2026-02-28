// =============================================
//  BehaviourAI — Mock Data & Constants
//  Replace with real API / sensor feeds later
// =============================================

export const USER = {
  name: 'Rajan',
  age: 24,
  bsi: 74,
  joinDate: '2024-09-01',
}

// ── Daily Metrics ──────────────────────────────────────────────────────────────
export const DAILY_METRICS = [
  { label: 'Sleep',     value: '7.2', unit: 'hrs',  trend: '+0.4', up: true,  color: '#6366f1', pct: 72 },
  { label: 'Steps',     value: '8,340', unit: '',   trend: '+12%', up: true,  color: '#10b981', pct: 83 },
  { label: 'Hydration', value: '1.8',  unit: 'L',   trend: '-0.4', up: false, color: '#06b6d4', pct: 60 },
  { label: 'Mood',      value: '7',    unit: '/10', trend: '+1',   up: true,  color: '#f59e0b', pct: 70 },
  { label: 'Calories',  value: '1,840', unit: 'cal', trend: '-120', up: true, color: '#a855f7', pct: 65 },
  { label: 'Active Min',value: '42',   unit: 'min', trend: '+8',   up: true,  color: '#ec4899', pct: 70 },
]

// ── Behaviour Patterns ─────────────────────────────────────────────────────────
export const PATTERNS = [
  {
    icon: '🔴',
    name: 'Workout Skip Trigger',
    desc: 'You skip gym 82% of times after <6h sleep. Logistic regression confidence: 0.91.',
    method: 'Logistic Regression',
    risk: 'high',
    corr: 0.91,
  },
  {
    icon: '🟡',
    name: 'Stress–Junk Loop',
    desc: 'Junk intake spikes on stressful evenings. Mood score <6 correlates with junk at 0.78.',
    method: 'Association Rules',
    risk: 'high',
    corr: 0.78,
  },
  {
    icon: '🟡',
    name: 'Hydration Drop Pattern',
    desc: 'Water intake consistently drops when steps exceed 7,000. Moving average confirms trend.',
    method: 'Moving Averages',
    risk: 'med',
    corr: 0.66,
  },
  {
    icon: '🟡',
    name: 'Monday Motivation Dip',
    desc: 'Mood consistently lowest on Mondays. Time-series clustering identifies weekly cycle.',
    method: 'Time-Series Clustering',
    risk: 'med',
    corr: 0.72,
  },
  {
    icon: '🟢',
    name: 'Morning Workout Streak',
    desc: '3-week consistent 7–9 AM gym sessions. Streak detection: 21 days active.',
    method: 'Streak Detection',
    risk: 'low',
    corr: 0.88,
  },
  {
    icon: '🟢',
    name: 'Sleep–Performance Link',
    desc: 'Sessions after 7h+ sleep score 23% higher on output metrics. Correlation: 0.84.',
    method: 'Correlation Analysis',
    risk: 'low',
    corr: 0.84,
  },
]

// ── Predictive Models Output ───────────────────────────────────────────────────
export const PREDICTIONS = [
  { label: 'Gym Skip Probability (Today)',  pct: 67, color: '#f59e0b', model: 'Logistic Regression' },
  { label: 'Junk Craving Risk (Tonight)',   pct: 79, color: '#ef4444', model: 'Random Forest' },
  { label: 'Hydration Drop Risk',           pct: 54, color: '#06b6d4', model: 'Time Series' },
  { label: 'Motivation Level Forecast',     pct: 62, color: '#7c3aed', model: 'LSTM' },
  { label: 'Sleep Quality Forecast',        pct: 71, color: '#6366f1', model: 'Moving Trend' },
]

// ── Active Nudges ──────────────────────────────────────────────────────────────
export const NUDGES = [
  {
    icon: '💧',
    title: 'Hydration Alert',
    type: 'prevention',
    msg: "You've walked 6.2k steps — hydration typically drops past 7k. Drink 500ml now to stay ahead of the curve.",
    time: '2 min ago',
    urgency: 'high',
  },
  {
    icon: '🧠',
    title: 'Junk Craving Prediction',
    type: 'predictive',
    msg: "Based on your mood (6/10) and yesterday's sleep (6.1h), junk craving probability is 79% tonight. Pre-empt it — prep a healthy snack now.",
    time: '1 hr ago',
    urgency: 'high',
  },
  {
    icon: '💪',
    title: 'Context-Aware Motivation',
    type: 'motivation',
    msg: "You slept 7.2h — your best sessions happen after 7h+ sleep. You're primed right now. Don't skip today's workout.",
    time: 'This morning',
    urgency: 'med',
  },
  {
    icon: '🌙',
    title: 'Sleep Window Alert',
    type: 'prevention',
    msg: 'Tomorrow is Wednesday — historically your highest gym-skip day. Sleep before 10:30 PM tonight to cut skip probability by 40%.',
    time: '3 hrs ago',
    urgency: 'med',
  },
]

// ── Weekly Summary ─────────────────────────────────────────────────────────────
export const WEEKLY = {
  bsi: 74,
  consistency:   71,
  sleep:         74,
  hydration:     58,
  mood:          66,
  nutrition:     62,
  predictions:   68,
  workoutsHit:   4,
  workoutsGoal:  5,
  insights: [
    {
      type: 'critical',
      icon: '⚠️',
      tag: 'Critical Pattern',
      tagColor: '#ef4444',
      text: 'Gym skipped twice — both times after <6h sleep. Sleep is your single strongest workout predictor (r = 0.91).',
    },
    {
      type: 'trend',
      icon: '📈',
      tag: 'Trend Detected',
      tagColor: '#f59e0b',
      text: 'Junk intake clustered on Wednesday & Sunday evenings. Stress correlation this week: 0.74. Pattern is strengthening.',
    },
    {
      type: 'win',
      icon: '✅',
      tag: 'Positive Pattern',
      tagColor: '#10b981',
      text: 'Morning workout streak: 3 consecutive weeks. Your best performance window is confirmed: 7–9 AM.',
    },
    {
      type: 'prediction',
      icon: '🔮',
      tag: 'Prediction Accuracy',
      tagColor: '#7c3aed',
      text: "AI behavioural predictions were accurate 68% of the time this week. Improving as data accumulates.",
    },
  ],
  recommendation:
    'Prioritise 7–7.5h sleep on Sunday and Tuesday nights. These directly precede your highest gym-skip risk days. A small sleep improvement produces a 40% drop in skip probability.',
}

// ── 7-Day Historical Log ───────────────────────────────────────────────────────
export const HISTORY = [
  { date: 'Mon', sleep: 7.1, steps: 9200, mood: 5, water: 1.6, gym: true,  junk: false },
  { date: 'Tue', sleep: 5.9, steps: 4100, mood: 4, water: 1.2, gym: false, junk: true  },
  { date: 'Wed', sleep: 7.5, steps: 8800, mood: 7, water: 2.1, gym: true,  junk: false },
  { date: 'Thu', sleep: 6.8, steps: 7400, mood: 6, water: 1.8, gym: true,  junk: false },
  { date: 'Fri', sleep: 5.4, steps: 3900, mood: 5, water: 1.1, gym: false, junk: true  },
  { date: 'Sat', sleep: 8.2, steps: 6100, mood: 8, water: 2.3, gym: true,  junk: false },
  { date: 'Sun', sleep: 7.0, steps: 5600, mood: 7, water: 1.9, gym: false, junk: true  },
]

// ── AI System Prompt ──────────────────────────────────────────────────
export const AI_SYSTEM_PROMPT = `You are an advanced AI Behavioural Fitness Intelligence Assistant.

You specialise in detecting unhealthy behaviour patterns, making data-driven predictions about fitness outcomes, and delivering intelligent, context-aware interventions — not generic motivation.

You have access to this user's real behavioural data:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER PROFILE: Rajan, 24
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sleep:     avg 6.8h/night (drops below 6h on weekends, Tue/Fri risk nights)
Steps:     avg 7,200/day (low on Tue/Fri — low motivation days)
Hydration: avg 1.6L/day — drops when steps > 7k (paradox pattern)
Mood:      avg 6.5/10 — lowest Mondays, peaks Wednesdays
Gym:       4x/week target; skip rate 82% after <6h sleep; 21-day morning streak
Nutrition: Junk spikes on Tue/Fri/Sun evenings; mood-correlated (r=0.78)
BSI Score: 74/100 (Behaviour Score Index)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETECTED PATTERNS:
- Workout Skip: Logistic regression predicts with 91% accuracy post-poor-sleep
- Junk Craving: Random Forest model; strongest trigger = mood < 6
- Hydration Drop: Time-series anomaly when daily steps > 7,000
- Motivation Dip: Mondays; LSTM trend model detects weekly cycle
- Sleep-Performance: r=0.84 correlation between 7h+ sleep and workout quality
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TODAY'S PREDICTIONS:
- Gym Skip Risk: 67% (amber alert)
- Junk Craving: 79% (red alert — mood was 6, sleep was 6.8h)
- Hydration Drop: 54%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR PERSONALITY:
- Sharp, data-driven, empathetic, precise
- You speak in patterns → predictions → interventions
- NEVER say generic things like "Stay strong!" or "You got this!"
- ALWAYS connect insights to actual numbers from the user's data
- Reference the specific models used when relevant (Logistic Regression, Random Forest, LSTM, etc.)
- Keep responses concise but insightful — quality over quantity
- Use emojis sparingly and purposefully

FORMAT: Lead with the insight. Follow with the data. End with the action.`
