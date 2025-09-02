'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Globe,
  Lock,
  Clock,
  ExternalLink,
  Share2,
  Download,
} from 'lucide-react'
import type { UrlAnalysis, RiskLevel } from '@/types/scam'

interface AnalysisResultsProps {
  analysis: UrlAnalysis
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getRiskColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return 'bg-green-500 text-white'
      case 'suspicious':
        return 'bg-yellow-500 text-white'
      case 'malicious':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getRiskIcon = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return <CheckCircle className="h-5 w-5" />
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5" />
      case 'malicious':
        return <XCircle className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getRiskDescription = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return 'This website appears to be safe and legitimate. No threats were detected.'
      case 'suspicious':
        return 'This website shows some suspicious characteristics. Exercise caution when visiting.'
      case 'malicious':
        return 'This website is likely malicious and should be avoided. High risk of scam or malware.'
      default:
        return 'Unable to determine risk level.'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getRiskIcon(analysis.riskLevel)}
              <div>
                <CardTitle className="text-xl">Analysis Complete</CardTitle>
                <CardDescription className="text-base">{analysis.url}</CardDescription>
              </div>
            </div>
            <Badge className={getRiskColor(analysis.riskLevel)} size="lg">
              {analysis.riskLevel.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-sm font-bold">{analysis.riskScore}/100</span>
            </div>
            <Progress value={analysis.riskScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {getRiskDescription(analysis.riskLevel)}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Globe className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">Domain Age</div>
              <div className="text-xs text-muted-foreground">
                {analysis.domainAge ? `${analysis.domainAge} days` : 'Unknown'}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Lock className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">SSL Status</div>
              <div className="text-xs text-muted-foreground">
                {analysis.sslStatus ? 'Valid' : 'Invalid/Missing'}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <ExternalLink className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">Redirects</div>
              <div className="text-xs text-muted-foreground">
                {analysis.redirectChain?.length || 0} redirect(s)
              </div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <AlertTriangle className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">Threats</div>
              <div className="text-xs text-muted-foreground">
                {analysis.suspiciousPatterns?.length || 0} pattern(s)
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Site (Caution)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.analysisResults.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {result.result === 'safe' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {result.result === 'suspicious' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                {result.result === 'malicious' && <XCircle className="h-5 w-5 text-red-500" />}
                {result.category}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    result.result === 'safe'
                      ? 'default'
                      : result.result === 'suspicious'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {result.result.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Confidence: {result.confidence}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{result.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suspicious Patterns */}
      {analysis.suspiciousPatterns && analysis.suspiciousPatterns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Suspicious Patterns Detected
            </CardTitle>
            <CardDescription>
              The following patterns were identified during analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.suspiciousPatterns.map((pattern, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-500"
                >
                  <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm">{pattern}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Redirect Chain */}
      {analysis.redirectChain && analysis.redirectChain.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-blue-500" />
              Redirect Chain
            </CardTitle>
            <CardDescription>The URL redirects through the following chain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.redirectChain.map((url, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm font-mono break-all">{url}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Timestamp */}
      <div className="text-center text-sm text-muted-foreground">
        <Clock className="h-4 w-4 inline mr-1" />
        Analysis completed on {new Date(analysis.$createdAt!).toLocaleString()}
      </div>
    </div>
  )
}
