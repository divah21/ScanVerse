'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, XCircle, Eye, Trash2, Search, Filter } from 'lucide-react'

export function ReportManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock reports data
  const reports = [
    {
      id: '1',
      title: 'Fake Banking Website',
      url: 'fake-bank-login.com',
      type: 'Phishing',
      status: 'pending',
      reporter: 'user@example.com',
      date: '2024-01-15',
      severity: 'high',
      description: 'Website mimicking legitimate bank login page',
    },
    {
      id: '2',
      title: 'Cryptocurrency Investment Scam',
      url: 'crypto-profits-guaranteed.net',
      type: 'Investment Fraud',
      status: 'verified',
      reporter: 'reporter@email.com',
      date: '2024-01-14',
      severity: 'critical',
      description: 'Promising unrealistic returns on crypto investments',
    },
    {
      id: '3',
      title: 'Tech Support Scam',
      url: 'microsoft-support-urgent.com',
      type: 'Tech Support',
      status: 'rejected',
      reporter: 'concerned@user.com',
      date: '2024-01-13',
      severity: 'medium',
      description: 'Fake Microsoft support page requesting remote access',
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (reportId: string) => {
    console.log('[v0] Approving report:', reportId)
    // In real app, this would call API to approve report
  }

  const handleReject = (reportId: string) => {
    console.log('[v0] Rejecting report:', reportId)
    // In real app, this would call API to reject report
  }

  const handleDelete = (reportId: string) => {
    console.log('[v0] Deleting report:', reportId)
    // In real app, this would call API to delete report
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
          <CardDescription>Review and moderate scam reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-emerald-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{report.title}</h3>
                        <Badge
                          variant={
                            report.status === 'verified'
                              ? 'default'
                              : report.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {report.status}
                        </Badge>
                        <Badge
                          variant={
                            report.severity === 'critical'
                              ? 'destructive'
                              : report.severity === 'high'
                                ? 'destructive'
                                : report.severity === 'medium'
                                  ? 'secondary'
                                  : 'outline'
                          }
                        >
                          {report.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>URL: {report.url}</span>
                        <span>Type: {report.type}</span>
                        <span>Reporter: {report.reporter}</span>
                        <span>Date: {report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      {report.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            className="gap-1"
                            onClick={() => handleApprove(report.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-1"
                            onClick={() => handleReject(report.id)}
                          >
                            <XCircle className="h-3 w-3" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive hover:text-destructive bg-transparent"
                        onClick={() => handleDelete(report.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
