import { UrlAnalysis } from '@/types/scam'

// Basic URL analysis without AI - fallback when AI service is unavailable
export function createBasicAnalysis(url: string): UrlAnalysis {
  const analysis: UrlAnalysis = {
    url,
    riskLevel: 'suspicious',
    riskScore: 50,
    analysisResults: [],
    $createdAt: new Date().toISOString(),
  }

  try {
    const parsedUrl = new URL(url)
    const domain = parsedUrl.hostname.toLowerCase()
    const protocol = parsedUrl.protocol
    const path = parsedUrl.pathname

    let riskScore = 50 // Start with medium risk
    const findings: Array<{
      category: string
      result: 'safe' | 'suspicious' | 'malicious'
      confidence: number
      details: string
    }> = []

    // Protocol check
    if (protocol === 'https:') {
      riskScore -= 10
      findings.push({
        category: 'Security',
        result: 'safe',
        confidence: 90,
        details: 'Uses HTTPS encryption',
      })
    } else {
      riskScore += 15
      findings.push({
        category: 'Security',
        result: 'suspicious',
        confidence: 85,
        details: 'Does not use HTTPS encryption',
      })
    }

    // Domain analysis
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.top', '.click', '.download']
    const safeTlds = ['.com', '.org', '.edu', '.gov', '.net']

    const tld = domain.substring(domain.lastIndexOf('.'))

    if (suspiciousTlds.some((suspTld) => tld === suspTld)) {
      riskScore += 20
      findings.push({
        category: 'Domain',
        result: 'suspicious',
        confidence: 70,
        details: `Uses suspicious TLD: ${tld}`,
      })
    } else if (safeTlds.some((safeTld) => tld === safeTld)) {
      riskScore -= 5
      findings.push({
        category: 'Domain',
        result: 'safe',
        confidence: 60,
        details: `Uses common TLD: ${tld}`,
      })
    }

    // Subdomain check
    const subdomainCount = domain.split('.').length - 2
    if (subdomainCount > 2) {
      riskScore += 10
      findings.push({
        category: 'Domain',
        result: 'suspicious',
        confidence: 65,
        details: `Multiple subdomains detected (${subdomainCount})`,
      })
    }

    // Suspicious patterns in domain
    const suspiciousPatterns = [
      'secure',
      'bank',
      'paypal',
      'amazon',
      'microsoft',
      'google',
      'apple',
      'login',
      'verify',
      'update',
      'confirm',
      'account',
      'suspended',
    ]

    const domainLower = domain.toLowerCase()
    const suspiciousWords = suspiciousPatterns.filter(
      (pattern) => domainLower.includes(pattern) && !domainLower.endsWith(`${pattern}.com`)
    )

    if (suspiciousWords.length > 0) {
      riskScore += suspiciousWords.length * 15
      findings.push({
        category: 'Content',
        result: 'suspicious',
        confidence: 80,
        details: `Domain contains suspicious keywords: ${suspiciousWords.join(', ')}`,
      })
    }

    // URL length check
    if (url.length > 100) {
      riskScore += 10
      findings.push({
        category: 'Structure',
        result: 'suspicious',
        confidence: 60,
        details: 'Unusually long URL',
      })
    }

    // Path analysis
    if (path.includes('..') || path.includes('//')) {
      riskScore += 20
      findings.push({
        category: 'Structure',
        result: 'suspicious',
        confidence: 85,
        details: 'Suspicious path traversal patterns',
      })
    }

    // IP address check
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
    if (ipPattern.test(domain)) {
      riskScore += 25
      findings.push({
        category: 'Domain',
        result: 'suspicious',
        confidence: 90,
        details: 'Uses IP address instead of domain name',
      })
    }

    // Homograph/punycode check
    if (domain.includes('xn--')) {
      riskScore += 20
      findings.push({
        category: 'Domain',
        result: 'suspicious',
        confidence: 75,
        details: 'Uses internationalized domain (punycode)',
      })
    }

    // Clamp risk score
    riskScore = Math.max(0, Math.min(100, riskScore))

    // Determine risk level
    let riskLevel: 'safe' | 'suspicious' | 'malicious'
    if (riskScore < 30) {
      riskLevel = 'safe'
    } else if (riskScore < 70) {
      riskLevel = 'suspicious'
    } else {
      riskLevel = 'malicious'
    }

    analysis.riskScore = riskScore
    analysis.riskLevel = riskLevel
    analysis.analysisResults = findings

    return analysis
  } catch (error) {
    // If URL parsing fails, treat as high risk
    return {
      url,
      riskLevel: 'malicious',
      riskScore: 85,
      analysisResults: [
        {
          category: 'Structure',
          result: 'malicious',
          confidence: 95,
          details: 'Invalid or malformed URL structure',
        },
      ],
      $createdAt: new Date().toISOString(),
    }
  }
}

// Generate recommendations based on risk level
export function generateRecommendations(analysis: UrlAnalysis): string[] {
  const recommendations: string[] = []

  if (analysis.riskLevel === 'safe') {
    recommendations.push('URL appears to be legitimate')
    recommendations.push('Standard browsing precautions apply')
    recommendations.push('Verify SSL certificate if entering sensitive information')
  } else if (analysis.riskLevel === 'suspicious') {
    recommendations.push('Exercise caution when visiting this URL')
    recommendations.push('Do not enter sensitive information (passwords, credit cards)')
    recommendations.push('Verify the URL matches the intended destination')
    recommendations.push('Check for spelling errors in the domain name')
    recommendations.push('Consider using a VPN or sandbox environment')
  } else {
    recommendations.push('Do not visit this URL')
    recommendations.push('This URL shows signs of being malicious')
    recommendations.push('Report this URL to your IT security team')
    recommendations.push('Run antivirus scan if you have already visited')
    recommendations.push('Consider changing passwords if you entered credentials')
  }

  return recommendations
}
