// =============================================
//  AI Coach — Conversational Interface
// =============================================

import { useRef, useEffect } from 'react'
import { Card }        from '../components/Card'
import { useAICoach }  from '../hooks/useAICoach'
import styles          from './AICoach.module.css'

const QUICK_PROMPTS = [
  "Why do I keep skipping gym?",
  "Predict my risk for this week",
  "What triggers my junk food cravings?",
  "How do I improve my BSI score?",
  "Analyse my sleep patterns",
  "Give me tomorrow's action plan",
]

export function AICoach() {
  const { messages, loading, send, clearChat } = useAICoach()
  const inputRef = useRef(null)
  const chatRef  = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, loading])

  function handleSend() {
    const val = inputRef.current?.value?.trim()
    if (!val) return
    inputRef.current.value = ''
    send(val)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card style={{ maxWidth: 740 }}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar}>◈</div>
          <div>
            <div className={styles.name}>AI Coach</div>
            <div className={styles.sub}>Behavioural Intelligence Engine · Powered by AI</div>
          </div>
        </div>
        <button className={styles.clearBtn} onClick={clearChat}>Clear chat</button>
      </div>

      {/* Messages */}
      <div className={styles.messages} ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.ai}`}>
            {m.role === 'ai' && (
              <div className={styles.sender}>AI COACH</div>
            )}
            <div className={styles.bubble}>{m.content}</div>
            {m.role === 'user' && (
              <div className={`${styles.sender} ${styles.senderRight}`}>YOU</div>
            )}
          </div>
        ))}
        {loading && (
          <div className={`${styles.msg} ${styles.ai}`}>
            <div className={styles.sender}>AI COACH</div>
            <div className={`${styles.bubble} ${styles.typing}`}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className={styles.quickRow}>
        {QUICK_PROMPTS.map((q) => (
          <button key={q} className={styles.quickBtn}
            onClick={() => { if (inputRef.current) inputRef.current.value = q; inputRef.current?.focus() }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.textarea}
          placeholder="Ask your AI coach about patterns, predictions, or what to do today..."
          rows={2}
          onKeyDown={handleKey}
        />
        <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>
          {loading ? '…' : '→'}
        </button>
      </div>
      <div className={styles.hint}>Press Enter to send · Shift+Enter for new line</div>
    </Card>
  )
}
