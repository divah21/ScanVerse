'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Eye,
  Clock,
} from 'lucide-react'
import { ReportManagement } from './report-management'
import { AnalyticsCharts } from './analytics-charts'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demo
  const stats = {
    totalReports: 1247,
    pendingReports: 23,
    verifiedScams: 892,
    totalUsers: 5643,
    reportsToday: 15,
    analysisRequests: 3421,
    threatLevel: 'Medium',
    responseTime: '2.3 hours',
  }

  const quickActions = [
    {
      title: 'Review Pending Reports',
      description: '23 reports awaiting review',
      action: 'Review Now',
      icon: AlertTriangle,
      color: 'orange',
    },
    {
      title: 'Verify Scam Reports',
      description: '15 new scam reports to verify',
      action: 'Verify',
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: 'Update Threat Database',
      description: 'Sync with external threat feeds',
      action: 'Update',
      icon: Shield,
      color: 'blue',
    },
    {
      title: 'Generate Reports',
      description: 'Create monthly analytics report',
      action: 'Generate',
      icon: BarChart3,
      color: 'purple',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor platform activity and manage scam reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Analysis
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
          >
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReports.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{stats.reportsToday} today</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReports}</div>
                <div className="flex items-center space-x-1 text-xs text-orange-600">
                  <Clock className="h-3 w-3" />
                  <span>Avg. {stats.responseTime}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Scams</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.verifiedScams.toLocaleString()}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  71.6% verification rate
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+127 this week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Threat Detection</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Threat Level</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    {stats.threatLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                        <action.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{action.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {action.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest reports and system activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: 'report',
                    title: 'New phishing report: fake-bank-login.com',
                    time: '2 minutes ago',
                    status: 'pending',
                  },
                  {
                    type: 'verification',
                    title: 'Scam verified: crypto-investment-scam.net',
                    time: '15 minutes ago',
                    status: 'verified',
                  },
                  {
                    type: 'analysis',
                    title: 'URL analysis completed: suspicious-site.org',
                    time: '1 hour ago',
                    status: 'malicious',
                  },
                  {
                    type: 'user',
                    title: 'New user registration: user@example.com',
                    time: '2 hours ago',
                    status: 'active',
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === 'verified'
                          ? 'default'
                          : activity.status === 'pending'
                            ? 'secondary'
                            : activity.status === 'malicious'
                              ? 'destructive'
                              : 'outline'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <ReportManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Management</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Comprehensive user management features are coming soon.
                </p>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View User List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
