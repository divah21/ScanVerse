'use client'

import { useState } from 'react'

export interface AIAnalysisResult {
  url: string
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  summary: string
  findings: {
    category: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    evidence?: string[]
  }[]
  recommendations: string[]
  confidence: number
  analysisDate: string
}

export interface UseAIAnalysisReturn {
  analyzeUrl: (url: string) => Promise<AIAnalysisResult | null>
  isAnalyzing: boolean
  error: string | null
  lastAnalysis: AIAnalysisResult | null
}

export function useAIAnalysis(): UseAIAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastAnalysis, setLastAnalysis] = useState<AIAnalysisResult | null>(null)

  const analyzeUrl = async (url: string): Promise<AIAnalysisResult | null> => {
    setIsAnalyzing(true)
    setError(null)

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

      setLastAnalysis(data.analysis)
      return data.analysis
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    analyzeUrl,
    isAnalyzing,
    error,
    lastAnalysis,
  }
}
