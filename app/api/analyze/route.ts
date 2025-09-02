import { type NextRequest, NextResponse } from 'next/server'
import type { UrlAnalysis, AnalysisResult, RiskLevel } from '@/types/scam'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Simulate AI analysis with mock data
    const analysis = await performMockAnalysis(url)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

async function performMockAnalysis(url: string): Promise<UrlAnalysis> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock analysis logic based on URL patterns
  const analysisResults: AnalysisResult[] = []
  let riskScore = 0
  let riskLevel: RiskLevel = 'safe'
  const suspiciousPatterns: string[] = []

  // Domain Analysis
  const domain = new URL(url).hostname
  const isKnownSafe = ['google.com', 'github.com', 'microsoft.com', 'apple.com'].some((safe) =>
    domain.includes(safe)
  )
  const isSuspicious =
    domain.includes('suspicious') || domain.includes('phishing') || domain.includes('scam')

  if (isKnownSafe) {
    analysisResults.push({
      category: 'Domain Reputation',
      result: 'safe',
      confidence: 95,
      details: 'Domain is from a well-known, trusted organization with excellent reputation.',
    })
    riskScore += 5
  } else if (isSuspicious) {
    analysisResults.push({
      category: 'Domain Reputation',
      result: 'malicious',
      confidence: 90,
      details: 'Domain contains suspicious keywords commonly used in scam websites.',
    })
    riskScore += 40
    suspiciousPatterns.push('Suspicious domain name pattern')
  } else {
    analysisResults.push({
      category: 'Domain Reputation',
      result: 'suspicious',
      confidence: 70,
      details: 'Domain reputation is unknown or recently registered. Exercise caution.',
    })
    riskScore += 20
  }

  // SSL Analysis
  const hasHttps = url.startsWith('https://')
  if (hasHttps) {
    analysisResults.push({
      category: 'SSL Certificate',
      result: 'safe',
      confidence: 85,
      details: 'Valid SSL certificate detected. Connection is encrypted.',
    })
    riskScore += 5
  } else {
    analysisResults.push({
      category: 'SSL Certificate',
      result: 'suspicious',
      confidence: 80,
      details: 'No SSL certificate detected. Data transmission may not be secure.',
    })
    riskScore += 15
    suspiciousPatterns.push('Missing SSL certificate')
  }

  // Content Analysis
  if (isSuspicious) {
    analysisResults.push({
      category: 'Content Analysis',
      result: 'malicious',
      confidence: 85,
      details: 'Content contains multiple red flags associated with phishing and scam websites.',
    })
    riskScore += 30
    suspiciousPatterns.push(
      'Phishing keywords detected',
      'Urgent action language',
      'Suspicious form fields'
    )
  } else if (isKnownSafe) {
    analysisResults.push({
      category: 'Content Analysis',
      result: 'safe',
      confidence: 90,
      details: 'Content appears legitimate with no suspicious patterns detected.',
    })
    riskScore += 5
  } else {
    analysisResults.push({
      category: 'Content Analysis',
      result: 'suspicious',
      confidence: 75,
      details: 'Some potentially suspicious elements detected. Manual review recommended.',
    })
    riskScore += 15
  }

  // AI Threat Detection
  if (riskScore > 50) {
    analysisResults.push({
      category: 'AI Threat Detection',
      result: 'malicious',
      confidence: 88,
      details: 'Machine learning models indicate high probability of malicious intent.',
    })
    riskLevel = 'malicious'
  } else if (riskScore > 25) {
    analysisResults.push({
      category: 'AI Threat Detection',
      result: 'suspicious',
      confidence: 75,
      details: 'AI models detected some concerning patterns that warrant caution.',
    })
    riskLevel = 'suspicious'
  } else {
    analysisResults.push({
      category: 'AI Threat Detection',
      result: 'safe',
      confidence: 92,
      details: 'AI analysis indicates low risk with no significant threats detected.',
    })
    riskLevel = 'safe'
  }

  // Generate mock additional data
  const domainAge = Math.floor(Math.random() * 3650) + 30 // 30 days to 10 years
  const redirectChain = Math.random() > 0.7 ? [url, `https://redirect.${domain}`, url] : undefined

  return {
    $id: Math.random().toString(36).substring(7),
    $createdAt: new Date().toISOString(),
    url,
    riskLevel,
    riskScore: Math.min(riskScore, 100),
    analysisResults,
    domainAge,
    sslStatus: hasHttps,
    redirectChain,
    suspiciousPatterns: suspiciousPatterns.length > 0 ? suspiciousPatterns : undefined,
  }
}
