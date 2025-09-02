export interface ScamReport {
  $id?: string
  $createdAt?: string
  $updatedAt?: string
  title: string
  description: string
  scamUrl: string
  scamType: ScamType
  evidenceFiles?: string[]
  reporterEmail?: string
  status: ReportStatus
  severity: ScamSeverity
  isPublic: boolean
  tags?: string[]
  upvotes?: number
  downvotes?: number
}

export interface UrlAnalysis {
  $id?: string
  $createdAt?: string
  url: string
  riskLevel: RiskLevel
  riskScore: number
  analysisResults: AnalysisResult[]
  domainAge?: number
  sslStatus?: boolean
  redirectChain?: string[]
  suspiciousPatterns?: string[]
}

export interface AnalysisResult {
  category: string
  result: 'safe' | 'suspicious' | 'malicious'
  confidence: number
  details: string
}

export type ScamType =
  | 'phishing'
  | 'investment'
  | 'romance'
  | 'tech-support'
  | 'cryptocurrency'
  | 'shopping'
  | 'employment'
  | 'lottery'
  | 'charity'
  | 'other'

export type ReportStatus = 'pending' | 'approved' | 'rejected' | 'under-review'

export type ScamSeverity = 'low' | 'medium' | 'high' | 'critical'

export type RiskLevel = 'safe' | 'suspicious' | 'malicious'

export interface AdminStats {
  totalReports: number
  pendingReports: number
  approvedReports: number
  rejectedReports: number
  totalAnalyses: number
  riskDistribution: {
    safe: number
    suspicious: number
    malicious: number
  }
  scamTypeDistribution: Record<ScamType, number>
  recentActivity: {
    date: string
    reports: number
    analyses: number
  }[]
}
