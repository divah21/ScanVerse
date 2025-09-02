'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AnalysisResults } from '@/components/analyze/analysis-results'
import { Loader2, Search, Globe, AlertTriangle, Shield } from 'lucide-react'
import type { UrlAnalysis } from '@/types/scam'

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL (e.g., https://example.com)'),
})

type UrlFormValues = z.infer<typeof urlSchema>

export function UrlAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<UrlAnalysis | null>(null)

  const form = useForm<UrlFormValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmit = async (values: UrlFormValues) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisResult(null)

    try {
      // Simulate analysis progress
      const progressSteps = [
        { progress: 20, message: 'Checking domain reputation...' },
        { progress: 40, message: 'Analyzing SSL certificate...' },
        { progress: 60, message: 'Scanning for phishing patterns...' },
        { progress: 80, message: 'Running AI threat detection...' },
        { progress: 100, message: 'Analysis complete!' },
      ]

      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnalysisProgress(step.progress)
      }

      // Call analysis API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: values.url }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result: UrlAnalysis = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error('Analysis error:', error)
      // Show error state
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const exampleUrls = [
    'https://google.com',
    'https://github.com',
    'https://suspicious-site-example.com',
    'https://phishing-demo.test',
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Analysis Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Globe className="h-6 w-6" />
                URL Security Analysis
              </CardTitle>
              <CardDescription>
                Enter any website URL to get an instant security assessment and threat analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              placeholder="https://example.com"
                              className="text-lg"
                              disabled={isAnalyzing}
                              {...field}
                            />
                            <Button type="submit" size="lg" disabled={isAnalyzing}>
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Example URLs */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Try these example URLs:</p>
                    <div className="flex flex-wrap gap-2">
                      {exampleUrls.map((url) => (
                        <Button
                          key={url}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => form.setValue('url', url)}
                          disabled={isAnalyzing}
                        >
                          {url}
                        </Button>
                      ))}
                    </div>
                  </div>
                </form>
              </Form>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">Analyzing URL security...</span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Domain Check</div>
                      <Badge variant={analysisProgress >= 20 ? 'default' : 'secondary'}>
                        {analysisProgress >= 20 ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">SSL Analysis</div>
                      <Badge variant={analysisProgress >= 40 ? 'default' : 'secondary'}>
                        {analysisProgress >= 40 ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Pattern Scan</div>
                      <Badge variant={analysisProgress >= 60 ? 'default' : 'secondary'}>
                        {analysisProgress >= 60 ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">AI Detection</div>
                      <Badge variant={analysisProgress >= 80 ? 'default' : 'secondary'}>
                        {analysisProgress >= 80 ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && <AnalysisResults analysis={analysisResult} />}

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Domain Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Check domain age, reputation, and registration details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Content Scanning</p>
                    <p className="text-sm text-muted-foreground">
                      Analyze page content for suspicious patterns and keywords
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">AI Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      Machine learning models evaluate overall threat level
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Risk Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500 text-white">Safe</Badge>
                  <p className="text-sm">No threats detected, safe to visit</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500 text-white">Suspicious</Badge>
                  <p className="text-sm">Potential risks identified, proceed with caution</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500 text-white">Malicious</Badge>
                  <p className="text-sm">High risk detected, avoid visiting this site</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
