import { NextRequest, NextResponse } from 'next/server'

interface AIAnalysisRequest {
  url: string
  analysisType?: 'scam' | 'security' | 'content'
}

interface AIAnalysisResponse {
  success: boolean
  analysis?: {
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
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let requestUrl = ''

  try {
    const { url, analysisType = 'scam' }: AIAnalysisRequest = await request.json()
    requestUrl = url

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid URL format' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL

    console.log('API Key exists:', !!apiKey)
    console.log('Model:', model)

    if (!apiKey || !model) {
      console.error('Missing environment variables:', { apiKey: !!apiKey, model })
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 500 }
      )
    }

    // Create AI prompt for deep URL analysis
    const prompt = createAnalysisPrompt(url, analysisType)

    console.log('Making request to OpenRouter with model:', model)

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ScamVerse AI Analysis',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert cybersecurity analyst specializing in scam detection and URL analysis. Provide detailed, accurate assessments in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    })

    console.log('OpenRouter response status:', response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json(
        { success: false, error: `AI analysis failed: ${response.status}` },
        { status: 500 }
      )
    }

    const aiResponse = await response.json()
    console.log('AI Response:', aiResponse)

    const analysisText = aiResponse.choices?.[0]?.message?.content

    console.log('Analysis text received:', !!analysisText)

    if (!analysisText) {
      console.error('No content in AI response:', aiResponse)
      return NextResponse.json(
        { success: false, error: 'No analysis received from AI' },
        { status: 500 }
      )
    }

    // Parse AI response and structure the analysis
    const analysis = parseAIAnalysis(analysisText, url)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error('AI Analysis API error:', error)

    // Provide a fallback analysis if AI fails
    const fallbackAnalysis = {
      url: requestUrl,
      riskScore: 50,
      riskLevel: 'medium' as const,
      summary: 'AI analysis temporarily unavailable. Manual review recommended.',
      findings: [
        {
          category: 'System Notice',
          severity: 'medium' as const,
          description:
            'AI analysis service is currently unavailable. This is a basic URL validation.',
          evidence: ['AI service offline', 'Fallback analysis provided'],
        },
      ],
      recommendations: [
        'Manual security review recommended',
        'Check domain reputation manually',
        'Verify SSL certificate if visiting',
        'Exercise caution with personal information',
      ],
      confidence: 30,
      analysisDate: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
    })
  }
}

function createAnalysisPrompt(url: string, analysisType: string): string {
  return `
Analyze this URL for scam/security risks: ${url}

Please provide a JSON response with this exact structure:
{
  "riskScore": 75,
  "riskLevel": "high",
  "summary": "Brief analysis summary",
  "findings": [
    {
      "category": "Domain Analysis",
      "severity": "high",
      "description": "Specific finding about the domain",
      "evidence": ["Evidence point 1", "Evidence point 2"]
    }
  ],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "confidence": 85
}

Focus on:
- Domain reputation and age
- SSL/HTTPS security
- Content analysis if possible
- Known scam patterns
- Technical red flags

Provide only the JSON response, no additional text.
`
}

function parseAIAnalysis(analysisText: string, url: string): AIAnalysisResponse['analysis'] {
  try {
    // Try to extract JSON from the AI response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        url,
        riskScore: parsed.riskScore || 0,
        riskLevel: parsed.riskLevel || 'low',
        summary: parsed.summary || 'Analysis completed',
        findings: parsed.findings || [],
        recommendations: parsed.recommendations || [],
        confidence: parsed.confidence || 0,
        analysisDate: new Date().toISOString(),
      }
    }
  } catch (error) {
    console.error('Failed to parse AI analysis:', error)
  }

  // Fallback: create structured response from text
  return {
    url,
    riskScore: 50,
    riskLevel: 'medium',
    summary: 'AI analysis completed with mixed results',
    findings: [
      {
        category: 'General Analysis',
        severity: 'medium',
        description: analysisText.slice(0, 300) + '...',
        evidence: [],
      },
    ],
    recommendations: ['Manual review recommended', 'Exercise caution when visiting this URL'],
    confidence: 70,
    analysisDate: new Date().toISOString(),
  }
}
