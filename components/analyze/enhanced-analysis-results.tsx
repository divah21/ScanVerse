'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'

interface AnalysisResult {
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

interface AnalysisResultsProps {
  results: AnalysisResult
  isLoading?: boolean
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, isLoading = false }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      low: 'outline',
      medium: 'secondary',
      high: 'default',
      critical: 'destructive',
    }
    return <Badge variant={variants[severity] || 'outline'}>{severity.toUpperCase()}</Badge>
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 animate-pulse" />
            <CardTitle>Analyzing URL...</CardTitle>
          </div>
          <CardDescription>Please wait while we perform a security analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className={`border-2 ${getRiskColor(results.riskLevel)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getRiskIcon(results.riskLevel)}
              <div>
                <CardTitle className="text-xl">Security Analysis Complete</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  URL: {results.url}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Risk Level</div>
              <Badge className={`${getRiskColor(results.riskLevel)} font-semibold`}>
                {results.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Risk Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-lg font-bold">{results.riskScore}/100</span>
            </div>
            <Progress value={results.riskScore} className="h-2" />
          </div>

          {/* Summary */}
          <div>
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-muted-foreground">{results.summary}</p>
          </div>

          {/* Confidence */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Analysis Confidence: {results.confidence}% • Completed:{' '}
              {new Date(results.analysisDate).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Findings */}
      {results.findings && results.findings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detailed Findings</CardTitle>
            <CardDescription>Security issues and observations identified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.findings.map((finding, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{finding.category}</Badge>
                      {getSeverityBadge(finding.severity)}
                    </div>
                  </div>
                  <p className="font-medium">{finding.description}</p>
                  {finding.evidence && finding.evidence.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Evidence:</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                        {finding.evidence.map((evidence, evidenceIndex) => (
                          <li key={evidenceIndex}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
            <CardDescription>Actions you should take based on this analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Alert based on risk level */}
      {results.riskLevel === 'high' || results.riskLevel === 'critical' ? (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>⚠️ High Risk Detected:</strong> This URL shows significant security concerns.
            Avoid visiting and do not enter any personal information.
          </AlertDescription>
        </Alert>
      ) : results.riskLevel === 'medium' ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>⚡ Caution Advised:</strong> Some concerning elements detected. Proceed with
            care and avoid entering sensitive information.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>✅ Low Risk:</strong> This URL appears to be safe based on our analysis.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
