// =============================================
//  useAICoach — AI Integration Hook
//  Uses Vite proxy → OpenRouter (avoids CORS)
// =============================================

import { useState, useCallback } from 'react'
import { AI_SYSTEM_PROMPT } from '../data/mockData'

// Goes through Vite proxy defined in vite.config.js
// Proxy forwards to https://openrouter.ai/api/v1/chat/completions
// and injects the Authorization header from .env
const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL   = 'mistralai/mistral-small-3.1-24b-instruct:free'

export function useAICoach() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content:
        "Hey — I'm your AI fitness coach. I've been analysing your patterns for the past 3 weeks.\n\nRight now, your gym skip risk is elevated (67%) and junk craving probability tonight is 79%. Want to know why — and what to do about it?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const send = useCallback(async (userText) => {
    if (!userText.trim() || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: userText.trim() }])
    setLoading(true)
    setError(null)

    // Build history for API (convert 'ai' → 'assistant')
    const history = messages.map((m) => ({
      role:    m.role === 'ai' ? 'assistant' : 'user',
      content: m.content,
    }))

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model:    MODEL,
          messages: [
            { role: 'system', content: AI_SYSTEM_PROMPT },
            ...history,
            { role: 'user', content: userText.trim() },
          ],
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData?.error?.message || `API error: ${res.status}`)
      }

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content || 'No response received.'

      setMessages((prev) => [...prev, { role: 'ai', content: text }])
    } catch (err) {
      setError(err.message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: `Error: ${err.message}\n\nMake sure your VITE_OPENROUTER_API_KEY is set in the .env file and restart the dev server.`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: 'ai',
        content: "Chat cleared. I still remember your patterns — what would you like to explore?",
      },
    ])
  }, [])

  return { messages, loading, error, send, clearChat }
}
