'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
  Loader2,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  ExternalLink,
} from 'lucide-react'
import { useAIAnalysis, AIAnalysisResult } from '@/hooks/use-ai-analysis'
import { ReactElement } from 'react'

interface AIAnalysisComponentProps {
  initialUrl?: string
  className?: string
}

export default function AIAnalysisComponent({
  initialUrl = '',
  className = '',
}: AIAnalysisComponentProps) {
  const [url, setUrl] = useState(initialUrl)
  const { analyzeUrl, isAnalyzing, error, lastAnalysis } = useAIAnalysis()

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    await analyzeUrl(url.trim())
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-4 w-4" />
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'critical':
        return <XCircle className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className={className}>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <Brain className="h-5 w-5 text-blue-500" />
            <span>AI Deep Analysis</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Advanced AI-powered URL analysis for scam detection and security assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Form */}
          <form onSubmit={handleAnalysis} className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter URL to analyze (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                type="submit"
                disabled={isAnalyzing || !url.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Active Analysis Indicator */}
          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Active AI Search in Progress...</span>
              </div>
              <Progress value={undefined} className="h-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI is performing deep analysis of the URL including domain reputation, content
                analysis, and security assessment.
              </p>
            </div>
          )}

          {/* Analysis Results */}
          {lastAnalysis && !isAnalyzing && (
            <AnalysisResults
              analysis={lastAnalysis}
              getRiskColor={getRiskColor}
              getRiskIcon={getRiskIcon}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface AnalysisResultsProps {
  analysis: AIAnalysisResult
  getRiskColor: (level: string) => string
  getRiskIcon: (level: string) => ReactElement
}

function AnalysisResults({ analysis, getRiskColor, getRiskIcon }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      {/* Overall Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.riskScore}/100
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Risk Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Badge className={getRiskColor(analysis.riskLevel)}>
                {getRiskIcon(analysis.riskLevel)}
                <span className="ml-1 capitalize">{analysis.riskLevel} Risk</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.confidence}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Confidence</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* URL Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Analyzed URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm">
            <ExternalLink className="h-4 w-4 text-gray-500" />
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100 break-all">
              {analysis.url}
            </code>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{analysis.summary}</p>
        </CardContent>
      </Card>

      {/* Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Security Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.findings.map((finding, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{finding.category}</h4>
                  <Badge className={getRiskColor(finding.severity)} variant="outline">
                    {getRiskIcon(finding.severity)}
                    <span className="ml-1 capitalize">{finding.severity}</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {finding.description}
                </p>
                {finding.evidence && finding.evidence.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">Evidence:</p>
                    {finding.evidence.map((evidence, evidenceIndex) => (
                      <p
                        key={evidenceIndex}
                        className="text-xs text-gray-500 dark:text-gray-400 ml-2"
                      >
                        • {evidence}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Metadata */}
      <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        Analysis completed on {new Date(analysis.analysisDate).toLocaleString()}
      </div>
    </div>
  )
}
