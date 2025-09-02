import { useState, useEffect } from 'react'
import { getUrlAnalyses, createUrlAnalysis, getUrlAnalysisByUrl } from '@/lib/appwrite-db'
import { UrlAnalysis } from '@/types/scam'

export const useUrlAnalysis = (userId?: string) => {
  const [analyses, setAnalyses] = useState<UrlAnalysis[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchAnalyses = async (limit: number = 20, offset: number = 0) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getUrlAnalyses(limit, offset, userId)
      setAnalyses(response.documents as unknown as UrlAnalysis[])
      setTotal(response.total)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analyses')
    } finally {
      setLoading(false)
    }
  }

  const analyzeUrl = async (analysisData: Partial<UrlAnalysis>) => {
    try {
      setError(null)
      const newAnalysis = await createUrlAnalysis(analysisData)
      setAnalyses((prev) => [newAnalysis as unknown as UrlAnalysis, ...prev])
      return newAnalysis
    } catch (err: any) {
      setError(err.message || 'Failed to save analysis')
      throw err
    }
  }

  const checkUrlHistory = async (url: string) => {
    try {
      setError(null)
      const existingAnalysis = await getUrlAnalysisByUrl(url)
      return existingAnalysis as unknown as UrlAnalysis | null
    } catch (err: any) {
      setError(err.message || 'Failed to check URL history')
      return null
    }
  }

  useEffect(() => {
    if (userId) {
      fetchAnalyses()
    }
  }, [userId])

  return {
    analyses,
    loading,
    error,
    total,
    fetchAnalyses,
    analyzeUrl,
    checkUrlHistory,
    refetch: () => fetchAnalyses(),
  }
}
