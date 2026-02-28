// =============================================
//  App.jsx — Root Component
//  Routes between all 5 pages
// =============================================

import { useState }      from 'react'
import { Layout }        from './components/Layout'
import { Dashboard }     from './pages/Dashboard'
import { LogToday }      from './pages/LogToday'
import { AICoach }       from './pages/AICoach'
import { Patterns }      from './pages/Patterns'
import { WeeklyReport }  from './pages/WeeklyReport'
import { PREDICTIONS }   from './data/mockData'

const SIDEBAR_PREDS = [
  { label: 'Gym Skip',  pct: PREDICTIONS[0].pct, color: PREDICTIONS[0].color },
  { label: 'Junk Food', pct: PREDICTIONS[1].pct, color: PREDICTIONS[1].color },
  { label: 'Dehydration', pct: PREDICTIONS[2].pct, color: PREDICTIONS[2].color },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const PAGE = {
    'Dashboard':     <Dashboard />,
    'Log Today':     <LogToday />,
    'AI Coach':      <AICoach />,
    'Patterns':      <Patterns />,
    'Weekly Report': <WeeklyReport />,
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      predictions={SIDEBAR_PREDS}
    >
      {PAGE[activeTab] || <Dashboard />}
    </Layout>
  )
}
