import { NextRequest, NextResponse } from 'next/server'
import { createFetchWithTimeout, isNetworkError, getNetworkErrorMessage } from '@/lib/network-utils'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OpenRouter API key not configured',
        status: 'error',
      })
    }

    console.log('Testing OpenRouter connectivity...')

    const fetchWithTimeout = createFetchWithTimeout(10000) // 10 second timeout

    // Simple test request to OpenRouter
    const response = await fetchWithTimeout('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const models = await response.json()
      return NextResponse.json({
        success: true,
        status: 'connected',
        message: 'OpenRouter API is accessible',
        modelCount: models.data?.length || 0,
      })
    } else {
      return NextResponse.json({
        success: false,
        status: 'api_error',
        error: `OpenRouter API returned ${response.status}`,
        message: 'API key may be invalid or service unavailable',
      })
    }
  } catch (error: any) {
    console.error('OpenRouter connectivity test failed:', error)

    if (isNetworkError(error)) {
      return NextResponse.json({
        success: false,
        status: 'network_error',
        error: getNetworkErrorMessage(error),
        message: 'Cannot reach OpenRouter API - check your internet connection',
      })
    }

    return NextResponse.json({
      success: false,
      status: 'unknown_error',
      error: error.message || 'Unknown error occurred',
      message: 'Failed to test OpenRouter connectivity',
    })
  }
}
