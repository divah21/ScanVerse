// Network utility functions for API routes

export const createFetchWithTimeout = (timeoutMs: number = 30000) => {
  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }
}

export const isNetworkError = (error: any): boolean => {
  return (
    error instanceof TypeError ||
    error.code === 'UND_ERR_CONNECT_TIMEOUT' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'ECONNREFUSED' ||
    error.name === 'AbortError'
  )
}

export const getNetworkErrorMessage = (error: any): string => {
  if (error.name === 'AbortError') {
    return 'Request timed out - please try again'
  }
  if (error.code === 'UND_ERR_CONNECT_TIMEOUT') {
    return 'Connection timed out - please check your internet connection'
  }
  if (error.code === 'ENOTFOUND') {
    return 'DNS lookup failed - please check your internet connection'
  }
  if (error.code === 'ECONNREFUSED') {
    return 'Connection refused - service may be temporarily unavailable'
  }
  if (error instanceof TypeError && error.message.includes('fetch failed')) {
    return 'Network connection failed - please check your internet connection'
  }
  return 'Network error occurred - please try again'
}

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries || !isNetworkError(error)) {
        throw error
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}
