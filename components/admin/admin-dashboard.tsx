'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  AlertTriangle,
  Shield,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
} from 'lucide-react'

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Reports',
      value: '2,847',
      change: '+12%',
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      title: 'Active Cases',
      value: '156',
      change: '+8%',
      icon: Shield,
      color: 'text-yellow-500',
    },
    {
      title: 'Resolved Cases',
      value: '2,691',
      change: '+15%',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Prevention Rate',
      value: '94.5%',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-blue-500',
    },
  ]

  const recentReports = [
    {
      id: 'RPT-001',
      type: 'Phishing',
      status: 'pending',
      severity: 'high',
      reporter: 'john.doe@email.com',
      date: '2024-01-15',
      description: 'Fake banking website collecting credentials',
    },
    {
      id: 'RPT-002',
      type: 'Investment',
      status: 'investigating',
      severity: 'critical',
      reporter: 'jane.smith@email.com',
      date: '2024-01-14',
      description: 'Cryptocurrency ponzi scheme',
    },
    {
      id: 'RPT-003',
      type: 'Romance',
      status: 'resolved',
      severity: 'medium',
      reporter: 'mike.wilson@email.com',
      date: '2024-01-13',
      description: 'Dating app financial manipulation',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'investigating':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitor scam reports and system performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Reports</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Latest scam reports requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">{report.id}</span>
                      <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                    </div>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>Type: {report.type}</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Reports
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions & Analytics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Review Pending Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Analytics Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Case Resolution</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    User Satisfaction
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
