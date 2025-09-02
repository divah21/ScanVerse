'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react'

interface ServiceStatus {
  name: string
  status: 'healthy' | 'degraded' | 'down' | 'testing'
  message: string
  lastChecked?: string
  details?: any
}

export const SystemStatusCard: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'OpenRouter API', status: 'testing', message: 'Checking...' },
    { name: 'AI Model', status: 'testing', message: 'Checking...' },
    { name: 'Chat Service', status: 'testing', message: 'Checking...' },
    { name: 'URL Analysis', status: 'testing', message: 'Checking...' },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const checkServices = async () => {
    setIsLoading(true)
    const updatedServices: ServiceStatus[] = []

    try {
      // Test OpenRouter connectivity
      const connectivityResponse = await fetch('/api/test-connectivity')
      const connectivityData = await connectivityResponse.json()

      updatedServices.push({
        name: 'OpenRouter API',
        status: connectivityData.success ? 'healthy' : 'down',
        message: connectivityData.message || connectivityData.error,
        lastChecked: new Date().toLocaleTimeString(),
        details: connectivityData,
      })

      // Test AI Model
      const modelResponse = await fetch('/api/test-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'moonshotai/kimi-dev-72b:free' }),
      })
      const modelData = await modelResponse.json()

      updatedServices.push({
        name: 'AI Model',
        status: modelData.success ? 'healthy' : 'down',
        message: modelData.message || modelData.error,
        lastChecked: new Date().toLocaleTimeString(),
        details: modelData,
      })

      // Test Chat Service
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Test message' }],
        }),
      })
      const chatData = await chatResponse.json()

      updatedServices.push({
        name: 'Chat Service',
        status: chatData.success ? 'healthy' : 'degraded',
        message: chatData.success ? 'Working normally' : 'Issues detected',
        lastChecked: new Date().toLocaleTimeString(),
        details: chatData,
      })

      // Test URL Analysis
      const analysisResponse = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://example.com',
          analysisType: 'security',
        }),
      })
      const analysisData = await analysisResponse.json()

      updatedServices.push({
        name: 'URL Analysis',
        status: analysisData.success ? 'healthy' : 'degraded',
        message: analysisData.success ? 'Working normally' : 'Issues detected',
        lastChecked: new Date().toLocaleTimeString(),
        details: analysisData,
      })
    } catch (error) {
      console.error('Service check failed:', error)
      // Fill in any missing services with error status
      const serviceNames = ['OpenRouter API', 'AI Model', 'Chat Service', 'URL Analysis']
      serviceNames.forEach((name) => {
        if (!updatedServices.find((s) => s.name === name)) {
          updatedServices.push({
            name,
            status: 'down',
            message: 'Check failed',
            lastChecked: new Date().toLocaleTimeString(),
          })
        }
      })
    }

    setServices(updatedServices)
    setIsLoading(false)
  }

  useEffect(() => {
    checkServices()
  }, [])

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'testing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: ServiceStatus['status']) => {
    const variants: Record<
      ServiceStatus['status'],
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      healthy: 'default',
      degraded: 'secondary',
      down: 'destructive',
      testing: 'outline',
    }

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const overallStatus = services.every((s) => s.status === 'healthy')
    ? 'All systems operational'
    : services.some((s) => s.status === 'down')
      ? 'Some services are down'
      : 'Some services are degraded'

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Status</CardTitle>
            <CardDescription>{overallStatus}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={checkServices} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <div>
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-muted-foreground">{service.message}</div>
                {service.lastChecked && (
                  <div className="text-xs text-muted-foreground">
                    Last checked: {service.lastChecked}
                  </div>
                )}
              </div>
            </div>
            {getStatusBadge(service.status)}
          </div>
        ))}

        {services.some((s) => s.status !== 'healthy') && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Some services are experiencing issues. The application includes fallback mechanisms to
              ensure continued functionality even when AI services are temporarily unavailable.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
