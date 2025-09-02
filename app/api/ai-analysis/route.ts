import { NextRequest, NextResponse } from 'next/server'
import {
  createFetchWithTimeout,
  retryWithBackoff,
  isNetworkError,
  getNetworkErrorMessage,
} from '@/lib/network-utils'
import { createBasicAnalysis, generateRecommendations } from '@/lib/basic-analysis'

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

    // Call OpenRouter API with retry logic
    try {
      const response = await retryWithBackoff(
        async () => {
          const fetchWithTimeout = createFetchWithTimeout(25000) // 25 second timeout

          return await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
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
        },
        2,
        1000
      ) // 2 retries with 1 second base delay      console.log('OpenRouter response status:', response.status)

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
    } catch (fetchError) {
      console.error('OpenRouter fetch error:', fetchError)

      if (isNetworkError(fetchError)) {
        console.log('Network error detected, falling back to basic analysis')

        // Use basic analysis as fallback
        const basicAnalysis = createBasicAnalysis(url)
        const recommendations = generateRecommendations(basicAnalysis)

        const fallbackAnalysis = {
          url: requestUrl,
          riskScore: basicAnalysis.riskScore,
          riskLevel: basicAnalysis.riskLevel,
          summary: `Basic analysis completed (AI unavailable: ${getNetworkErrorMessage(fetchError)})`,
          findings: basicAnalysis.analysisResults.map((result) => ({
            category: result.category,
            severity:
              result.result === 'malicious'
                ? 'high'
                : result.result === 'suspicious'
                  ? 'medium'
                  : 'low',
            description: result.details,
            evidence: ['Basic pattern analysis', 'No AI analysis available'],
          })),
          recommendations,
          confidence: 60,
          analysisDate: new Date().toISOString(),
        }

        return NextResponse.json({
          success: true,
          analysis: fallbackAnalysis,
        })
      }

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
  } catch (error) {
    console.error('AI Analysis API error:', error)

    // Return error response for general API errors
    return NextResponse.json({ success: false, error: 'Analysis request failed' }, { status: 500 })
  }
}

function createAnalysisPrompt(url: string, analysisType: string): string {
  return `You are a cybersecurity expert. Analyze this URL for scam/security risks: ${url}

IMPORTANT: Respond ONLY with a JSON object. Do not include any thinking process, explanations, or additional text.

Required JSON structure:
{
  "riskScore": [number 0-100],
  "riskLevel": "[low|medium|high|critical]",
  "summary": "[Brief 1-2 sentence summary]",
  "findings": [
    {
      "category": "[Domain|Security|Content|Technical]",
      "severity": "[low|medium|high|critical]",
      "description": "[Specific finding description]",
      "evidence": ["[Evidence point 1]", "[Evidence point 2]"]
    }
  ],
  "recommendations": ["[Actionable recommendation]"],
  "confidence": [number 0-100]
}

Analyze these aspects:
• Domain reputation, age, and registrar
• SSL certificate and HTTPS usage
• URL structure and suspicious patterns
• Known scam/phishing indicators
• Technical security markers

Return ONLY the JSON object, nothing else.`
}

function parseAIAnalysis(analysisText: string, url: string): AIAnalysisResponse['analysis'] {
  try {
    console.log('Raw AI response:', analysisText)

    // Clean the response text - remove thinking tags and extra content
    let cleanedText = analysisText.trim()

    // Remove thinking process markers
    cleanedText = cleanedText.replace(/◁think▷[\s\S]*?◁\/think▷/g, '')
    cleanedText = cleanedText.replace(/◁think▷[\s\S]*$/g, '')

    // Remove any text before the JSON starts
    const jsonStart = cleanedText.indexOf('{')
    const jsonEnd = cleanedText.lastIndexOf('}')

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1)
      console.log('Extracted JSON:', jsonString)

      const parsed = JSON.parse(jsonString)

      // Validate and sanitize the parsed data
      const riskScore =
        typeof parsed.riskScore === 'number' ? Math.max(0, Math.min(100, parsed.riskScore)) : 50
      const validRiskLevels = ['low', 'medium', 'high', 'critical']
      const riskLevel = validRiskLevels.includes(parsed.riskLevel) ? parsed.riskLevel : 'medium'

      return {
        url,
        riskScore,
        riskLevel,
        summary:
          typeof parsed.summary === 'string' ? parsed.summary : 'Security analysis completed',
        findings: Array.isArray(parsed.findings)
          ? parsed.findings.map((finding: any) => ({
              category: typeof finding.category === 'string' ? finding.category : 'General',
              severity: ['low', 'medium', 'high', 'critical'].includes(finding.severity)
                ? finding.severity
                : 'medium',
              description:
                typeof finding.description === 'string' ? finding.description : 'Analysis finding',
              evidence: Array.isArray(finding.evidence)
                ? finding.evidence.filter((e: any) => typeof e === 'string')
                : [],
            }))
          : [],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations.filter((r: any) => typeof r === 'string')
          : ['Manual security review recommended'],
        confidence:
          typeof parsed.confidence === 'number'
            ? Math.max(0, Math.min(100, parsed.confidence))
            : 70,
        analysisDate: new Date().toISOString(),
      }
    }
  } catch (error) {
    console.error('Failed to parse AI analysis:', error)
    console.log('Problematic text:', analysisText)
  }

  // Enhanced fallback: Use basic analysis if parsing fails
  console.log('Using basic analysis fallback due to parsing failure')
  const basicAnalysis = createBasicAnalysis(url)

  // Convert risk level to match expected format
  const convertRiskLevel = (level: string): 'low' | 'medium' | 'high' | 'critical' => {
    switch (level) {
      case 'safe':
        return 'low'
      case 'suspicious':
        return 'medium'
      case 'malicious':
        return 'high'
      default:
        return 'medium'
    }
  }

  return {
    url,
    riskScore: basicAnalysis.riskScore,
    riskLevel: convertRiskLevel(basicAnalysis.riskLevel),
    summary: 'AI analysis encountered issues, using basic security analysis',
    findings: basicAnalysis.analysisResults.map((result) => ({
      category: result.category,
      severity: convertRiskLevel(result.result),
      description: result.details,
      evidence: ['Basic pattern analysis', 'Fallback analysis due to AI parsing issues'],
    })),
    recommendations: generateRecommendations(basicAnalysis),
    confidence: 60,
    analysisDate: new Date().toISOString(),
  }
}
