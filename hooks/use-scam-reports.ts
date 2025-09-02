import { useState, useEffect } from 'react'
import { getScamReports, createScamReport, updateScamReportStatus } from '@/lib/appwrite-db'
import { ScamReport } from '@/types/scam'

export const useScamReports = (filters?: {
  status?: string
  category?: string
  userId?: string
}) => {
  const [reports, setReports] = useState<ScamReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchReports = async (limit: number = 20, offset: number = 0) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getScamReports(limit, offset, filters)
      setReports(response.documents as unknown as ScamReport[])
      setTotal(response.total)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reports')
    } finally {
      setLoading(false)
    }
  }

  const submitReport = async (reportData: Partial<ScamReport>) => {
    try {
      setError(null)
      const newReport = await createScamReport(reportData)
      setReports((prev) => [newReport as unknown as ScamReport, ...prev])
      return newReport
    } catch (err: any) {
      setError(err.message || 'Failed to submit report')
      throw err
    }
  }

  const updateReportStatus = async (reportId: string, status: string, adminNotes?: string) => {
    try {
      setError(null)
      const updatedReport = await updateScamReportStatus(reportId, status, adminNotes)
      setReports((prev) =>
        prev.map((report) =>
          report.$id === reportId ? (updatedReport as unknown as ScamReport) : report
        )
      )
      return updatedReport
    } catch (err: any) {
      setError(err.message || 'Failed to update report status')
      throw err
    }
  }

  useEffect(() => {
    fetchReports()
  }, [filters])

  return {
    reports,
    loading,
    error,
    total,
    fetchReports,
    submitReport,
    updateReportStatus,
    refetch: () => fetchReports(),
  }
}
