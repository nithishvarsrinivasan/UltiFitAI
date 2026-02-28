# 🧠 BehaviourAI — AI-Driven Behavioural Fitness Intelligence Assistant
**Powered by OpenClaw (Claude API)**

---

## 🎯 Project Overview

BehaviourAI is a next-generation fitness assistant that goes beyond tracking — it **learns your habits, detects behaviour patterns, predicts unhealthy actions, and intervenes with smart nudges** using real AI.

The core AI engine, **OpenClaw**, is powered by the **Anthropic Claude API** and is embedded directly into the app.

---

## 📁 Project Structure

```
behaviourAI/
├── index.html
├── package.json
├── vite.config.js
├── README.md
│
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root + routing
    │
    ├── styles/
    │   └── global.css        # CSS variables, animations, resets
    │
    ├── data/
    │   └── mockData.js       # All mock data, patterns, nudges, OpenClaw system prompt
    │
    ├── hooks/
    │   ├── useOpenClaw.js    # Claude API integration hook
    │   └── useLogger.js      # Daily log state + behavioural analysis
    │
    ├── utils/
    │   └── behavioural.js    # Pattern detection: BSI, correlations, predictions
    │
    ├── components/
    │   ├── Layout.jsx/.css   # App shell: header + sidebar
    │   ├── Card.jsx/.css     # Reusable card surface
    │   ├── ScoreRing.jsx     # Animated SVG BSI score ring
    │   ├── ProgressBar.jsx   # Labelled progress bars
    │   └── Heatmap.jsx/.css  # 12-week gym consistency heatmap
    │
    └── pages/
        ├── Dashboard.jsx/.css      # BSI, metrics, nudges, chart, heatmap
        ├── LogToday.jsx/.css       # Daily log form + OpenClaw analysis
        ├── AICoach.jsx/.css        # OpenClaw chat interface (live AI)
        ├── Patterns.jsx/.css       # Detected patterns + radar + bar charts
        └── WeeklyReport.jsx/.css   # Weekly summary, insights, goals
```

---

## 🛠 Setup Instructions

### 1. Install dependencies
```bash
cd behaviourAI
npm install
```

### 2. Add your API key
Copy the example env file and add your OpenRouter key:
```bash
cp .env.example .env
```
Then open `.env` and replace the placeholder:
```
VITE_OPENROUTER_API_KEY=your-openrouter-api-key-here
```
Get your key from: **https://openrouter.ai/keys**

### 3. Run the app
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🤖 AI Configuration

| Setting | Value |
|---|---|
| Provider | OpenRouter |
| Model | `anthropic/claude-sonnet-4.6` |
| API URL | `https://openrouter.ai/api/v1/chat/completions` |
| Key location | `.env` → `VITE_OPENROUTER_API_KEY` |
| Hook file | `src/hooks/useAICoach.js` |

⚠️ **Never commit your `.env` file** — it's already in `.gitignore`.

---

## 🔬 Behavioural Analytics Modules

| Feature | Method | File |
|---|---|---|
| BSI Score | Weighted composite formula | `utils/behavioural.js` |
| Gym Skip Prediction | Logistic Regression (simplified) | `utils/behavioural.js` |
| Junk Craving Prediction | Random Forest proxy | `utils/behavioural.js` |
| Hydration Drop | Moving Average + threshold | `utils/behavioural.js` |
| Sleep–Gym Correlation | Pearson Correlation | `utils/behavioural.js` |
| Streak Detection | Consecutive boolean scan | `utils/behavioural.js` |
| Pattern Detection | Rule-based + statistical | `data/mockData.js` |
| AI Coaching | LLM (Claude) | `hooks/useOpenClaw.js` |

---

## 📊 Pages

| Page | Description |
|---|---|
| **Dashboard** | Live BSI ring, 6 daily metrics, area chart, AI nudges, gym heatmap |
| **Log Today** | Manual data entry; instant OpenClaw behavioural analysis |
| **AI Coach** | Live Claude chat — context-aware, data-driven coaching |
| **Patterns** | 6 detected patterns, correlation stats, radar + bar charts, predictive models |
| **Weekly Report** | Full report with consistency scores, risk insights, AI-set goals |

---

## 🏆 Key Innovation: Behaviour Score Index (BSI)

A custom metric invented for this project that combines:
- Sleep quality (30% weight)
- Daily step count (25%)
- Hydration (25%)
- Mood score (20%)
- Gym bonus (+10)
- Junk food penalty (-8)

Produces a single 0–100 score, updated daily.

---

## 🔮 Future Enhancements
- Connect real wearable data (Fitbit, Apple Health API)
- Train actual ML models on 90-day+ user history
- Add push notification system for nudges
- Backend with persistent user storage (Supabase / Firebase)
- Multi-user support with comparative leaderboards
