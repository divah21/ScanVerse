'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export function AnalyticsCharts() {
  // Mock data for charts
  const monthlyReports = [
    { month: 'Jan', reports: 65, verified: 45 },
    { month: 'Feb', reports: 89, verified: 62 },
    { month: 'Mar', reports: 123, verified: 87 },
    { month: 'Apr', reports: 156, verified: 112 },
    { month: 'May', reports: 178, verified: 134 },
    { month: 'Jun', reports: 203, verified: 145 },
  ]

  const scamTypes = [
    { name: 'Phishing', value: 35, color: '#ef4444' },
    { name: 'Investment Fraud', value: 25, color: '#f97316' },
    { name: 'Tech Support', value: 20, color: '#eab308' },
    { name: 'Romance Scam', value: 12, color: '#22c55e' },
    { name: 'Other', value: 8, color: '#6366f1' },
  ]

  const dailyActivity = [
    { day: 'Mon', reports: 12, analysis: 45 },
    { day: 'Tue', reports: 19, analysis: 52 },
    { day: 'Wed', reports: 15, analysis: 38 },
    { day: 'Thu', reports: 23, analysis: 67 },
    { day: 'Fri', reports: 18, analysis: 43 },
    { day: 'Sat', reports: 8, analysis: 29 },
    { day: 'Sun', reports: 6, analysis: 21 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Reports Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports</CardTitle>
            <CardDescription>Reports submitted and verified over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReports}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reports" fill="#10b981" name="Total Reports" />
                <Bar dataKey="verified" fill="#059669" name="Verified" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scam Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Scam Types</CardTitle>
            <CardDescription>Distribution of reported scam categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scamTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scamTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>Reports and URL analysis requests by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="#10b981"
                strokeWidth={2}
                name="Reports"
              />
              <Line
                type="monotone"
                dataKey="analysis"
                stroke="#3b82f6"
                strokeWidth={2}
                name="URL Analysis"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">2.4h</div>
            <p className="text-sm text-muted-foreground">Average report review time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accuracy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">94.2%</div>
            <p className="text-sm text-muted-foreground">Correct scam identifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">4.8/5</div>
            <p className="text-sm text-muted-foreground">Average user rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
