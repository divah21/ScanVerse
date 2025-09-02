'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalysisResults } from '@/components/analyze/enhanced-analysis-results'
import { Search, Loader2 } from 'lucide-react'

export default function TestAnalysisPage() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeUrl = async () => {
    if (!url) return

    setIsLoading(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          analysisType: 'security',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.analysis)
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze URL')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    analyzeUrl()
  }

  const testUrls = [
    'https://google.com',
    'https://galomax.com',
    'https://facebook.com',
    'https://example-suspicious-site.tk',
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">URL Security Analysis Test</h1>
          <p className="text-muted-foreground">
            Test the improved AI-powered URL security analysis with clean, professional results
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Analyze a URL</CardTitle>
            <CardDescription>
              Enter any URL to get a comprehensive security analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !url}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Analyze
                </Button>
              </div>

              {/* Quick Test URLs */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Quick test:</span>
                {testUrls.map((testUrl) => (
                  <Button
                    key={testUrl}
                    variant="outline"
                    size="sm"
                    onClick={() => setUrl(testUrl)}
                    disabled={isLoading}
                  >
                    {testUrl.replace('https://', '')}
                  </Button>
                ))}
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                Error: {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {(isLoading || results) && <AnalysisResults results={results!} isLoading={isLoading} />}
      </div>
    </div>
  )
}
