'use client'

import { useState, useCallback } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  requiresUrlAnalysis?: boolean
  extractedUrl?: string
}

export interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
  analyzeExtractedUrl: (url: string) => Promise<void>
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm ScamVerse AI Assistant. I'm here to help you stay safe online. You can ask me about scams, check suspicious websites, or get general cybersecurity advice. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

      setIsLoading(true)
      setError(null)

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])

      try {
        // Prepare messages for API (exclude id and timestamp)
        const apiMessages = [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: apiMessages }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Chat failed')
        }

        // Add assistant response
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
          requiresUrlAnalysis: data.requiresUrlAnalysis,
          extractedUrl: data.extractedUrl,
        }

        setMessages((prev) => [...prev, assistantMessage])

        // If URL analysis is required, automatically trigger it
        if (data.requiresUrlAnalysis && data.extractedUrl) {
          console.log('Auto-triggering URL analysis for:', data.extractedUrl)
          setTimeout(() => {
            analyzeExtractedUrl(data.extractedUrl)
          }, 1000)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)

        // Add error message
        const errorAssistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content:
            "I apologize, but I'm having trouble responding right now. Please try again or ask me about website security and scam prevention!",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, errorAssistantMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading]
  )

  const analyzeExtractedUrl = useCallback(async (url: string) => {
    console.log('Starting URL analysis for:', url)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed')
      }

      const analysis = data.analysis

      // Create detailed analysis message
      const analysisContent = `🔍 **Deep Security Analysis Complete**

**URL:** ${analysis.url}
**Risk Level:** ${analysis.riskLevel.toUpperCase()} (${analysis.riskScore}/100)
**Confidence:** ${analysis.confidence}%

**Summary:** ${analysis.summary}

**Key Findings:**
${analysis.findings
  .map(
    (finding: any, index: number) =>
      `${index + 1}. **${finding.category}** (${finding.severity}): ${finding.description}`
  )
  .join('\n')}

**Recommendations:**
${analysis.recommendations.map((rec: string, index: number) => `• ${rec}`).join('\n')}

${
  analysis.riskLevel === 'high' || analysis.riskLevel === 'critical'
    ? '⚠️ **Warning:** This website appears to be suspicious. Please exercise extreme caution.'
    : analysis.riskLevel === 'medium'
      ? '⚡ **Caution:** Some concerning elements detected. Proceed with care.'
      : '✅ **Good News:** This website appears to be relatively safe.'
}`

      const analysisMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: analysisContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, analysisMessage])
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `I encountered an error while analyzing the URL: ${url}. Please try again or contact support if the issue persists.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm ScamVerse AI Assistant. I'm here to help you stay safe online. You can ask me about scams, check suspicious websites, or get general cybersecurity advice. How can I help you today?",
        timestamp: new Date(),
      },
    ])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    analyzeExtractedUrl,
  }
}
