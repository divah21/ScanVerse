import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  detectUrlIntent?: boolean
}

interface ChatResponse {
  success: boolean
  message?: string
  requiresUrlAnalysis?: boolean
  extractedUrl?: string
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { messages }: ChatRequest = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'Messages are required' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL

    if (!apiKey || !model) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const lastUserMessage = messages[messages.length - 1]?.content || ''

    console.log('Last user message:', lastUserMessage)

    // Extract URL from message if present
    const urlRegex = /(https?:\/\/[^\s]+)/gi
    const extractedUrls = lastUserMessage.match(urlRegex)
    const extractedUrl = extractedUrls?.[0]

    // Only check for URL analysis intent if there's actually a URL in the message
    const explicitUrlAnalysisKeywords = [
      'check this',
      'analyze this',
      'scan this',
      'is this safe',
      'review this',
    ]

    const hasExplicitUrlRequest = explicitUrlAnalysisKeywords.some((keyword) =>
      lastUserMessage.toLowerCase().includes(keyword)
    )

    // Need URL analysis only if there's a URL AND explicit request, or just a URL with suspicious context
    const needsUrlAnalysis =
      extractedUrl &&
      (hasExplicitUrlRequest ||
        lastUserMessage.toLowerCase().includes('suspicious') ||
        lastUserMessage.toLowerCase().includes('scam'))

    // Create system prompt for ScamVerse assistant
    const systemPrompt = `You are ScamVerse AI Assistant, a friendly and knowledgeable cybersecurity expert who helps people stay safe online.

Your personality:
- Conversational and helpful
- Expert in cybersecurity and online safety
- Friendly but professional
- Provide practical, actionable advice
- Answer questions naturally without always pushing URL analysis

Your main responsibilities:
1. Answer general cybersecurity questions (password security, safe browsing, etc.)
2. Provide online safety tips and best practices
3. Help with scam awareness and prevention
4. Only suggest URL analysis when users specifically mention a website or ask about checking a link

Guidelines:
- For general safety questions, provide comprehensive advice about online protection
- Don't assume every question needs URL analysis
- Only mention URL checking when the user specifically asks about a website or provides a URL
- Be conversational and helpful, not robotic
- Provide specific, actionable tips for staying safe online
- Keep responses informative but concise (2-4 sentences typically)

Remember: Not every cybersecurity question requires URL analysis. Answer naturally based on what the user is actually asking.`

    const chatMessages: ChatMessage[] = [{ role: 'system', content: systemPrompt }, ...messages]

    // If URL is detected and user seems to want analysis, prepare for URL analysis
    if (extractedUrl && needsUrlAnalysis) {
      console.log('Triggering URL analysis for:', extractedUrl)
      return NextResponse.json({
        success: true,
        message: `I found the URL: ${extractedUrl}. Let me perform a comprehensive security analysis for you. This will take a moment...`,
        requiresUrlAnalysis: true,
        extractedUrl: extractedUrl,
      })
    }

    // If URL is detected but no analysis keywords, still offer analysis
    if (extractedUrl && !needsUrlAnalysis) {
      console.log('URL detected without analysis keywords, offering analysis:', extractedUrl)
      return NextResponse.json({
        success: true,
        message: `I see you shared a URL: ${extractedUrl}. Would you like me to perform a security analysis to check if it's safe? I can scan it for scams, phishing attempts, and other security threats.`,
        requiresUrlAnalysis: true,
        extractedUrl: extractedUrl,
      })
    }

    // Regular conversation - let AI handle naturally without forcing URL analysis
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ScamVerse AI Assistant',
      },
      body: JSON.stringify({
        model: model,
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 300,
        top_p: 0.9,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)

      // Fallback response
      return NextResponse.json({
        success: true,
        message:
          "I'm here to help you stay safe online! You can ask me about scams, check suspicious websites, or get cybersecurity advice. How can I assist you today?",
      })
    }

    const aiResponse = await response.json()
    const assistantMessage = aiResponse.choices?.[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json({
        success: true,
        message:
          "I'm here to help with your cybersecurity questions! Feel free to ask me about scams, suspicious websites, or general online safety.",
      })
    }

    return NextResponse.json({
      success: true,
      message: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)

    // Fallback response
    return NextResponse.json({
      success: true,
      message:
        "Hello! I'm ScamVerse AI Assistant. I'm here to help you stay safe online. You can ask me about scams, check suspicious websites, or get cybersecurity advice. How can I help you today?",
    })
  }
}
