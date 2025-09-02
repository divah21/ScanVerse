import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { model = 'moonshot/kimi-dev-72b:free' } = await request.json()

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OpenRouter API key not configured',
      })
    }

    console.log('Testing model:', model)

    // Test the specific model with a simple prompt
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ScamVerse Model Test',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: 'Hello, can you respond with just "OK" to test the connection?',
          },
        ],
        max_tokens: 10,
        temperature: 0.1,
      }),
    })

    console.log('Response status:', response.status)

    if (response.ok) {
      const result = await response.json()
      const message = result.choices?.[0]?.message?.content

      return NextResponse.json({
        success: true,
        model: model,
        message: message,
        status: 'working',
      })
    } else {
      const errorText = await response.text()
      console.error('Model test error:', errorText)

      return NextResponse.json({
        success: false,
        model: model,
        error: `Model test failed: ${response.status}`,
        details: errorText,
        status: 'failed',
      })
    }
  } catch (error: any) {
    console.error('Model test error:', error)

    return NextResponse.json({
      success: false,
      error: error.message || 'Model test failed',
      status: 'error',
    })
  }
}
