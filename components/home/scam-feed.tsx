'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Filter,
  ExternalLink,
  AlertTriangle,
  Calendar,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import type { ScamReport, ScamType } from '@/types/scam'
import { ScrollReveal } from '@/components/common/scroll-reveal'
import { gsap } from 'gsap'

// Mock data for demonstration
const mockScamReports: ScamReport[] = [
  {
    $id: '1',
    $createdAt: '2024-01-15T10:30:00Z',
    title: 'Fake Amazon Customer Service',
    description:
      'Received a call claiming to be from Amazon asking for account verification. They requested my password and credit card details.',
    scamUrl: 'fake-amazon-support.com',
    scamType: 'phishing',
    status: 'approved',
    severity: 'high',
    isPublic: true,
    tags: ['phone-scam', 'impersonation'],
    upvotes: 23,
    downvotes: 1,
  },
  {
    $id: '2',
    $createdAt: '2024-01-14T15:45:00Z',
    title: 'Cryptocurrency Investment Scam',
    description:
      'Website promising 500% returns on Bitcoin investments. Asked for initial deposit of $500 minimum.',
    scamUrl: 'crypto-profits-guaranteed.net',
    scamType: 'investment',
    status: 'approved',
    severity: 'critical',
    isPublic: true,
    tags: ['crypto', 'investment'],
    upvotes: 45,
    downvotes: 2,
  },
  {
    $id: '3',
    $createdAt: '2024-01-13T09:20:00Z',
    title: 'Romance Scam on Dating App',
    description:
      'Person claimed to be military overseas, asked for money for emergency travel expenses after building relationship.',
    scamUrl: 'N/A',
    scamType: 'romance',
    status: 'approved',
    severity: 'medium',
    isPublic: true,
    tags: ['dating', 'military-impersonation'],
    upvotes: 18,
    downvotes: 0,
  },
]

export function ScamFeed() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Create floating particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-blue-400/20 rounded-full'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        sectionRef.current?.appendChild(particle)

        gsap.to(particle, {
          duration: 4 + Math.random() * 6,
          y: -100 - Math.random() * 200,
          x: -30 + Math.random() * 60,
          opacity: 0,
          repeat: -1,
          delay: Math.random() * 3,
          ease: 'power2.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Animate new cards when they load
      if (gridRef.current) {
        const newCards = gridRef.current.querySelectorAll('.scam-card:nth-last-child(-n+3)')
        gsap.fromTo(
          newCards,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
        )
      }
    }, 1500)
  }

  const filteredReports = mockScamReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || report.scamType === selectedType
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity

    return matchesSearch && matchesType && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground'
      case 'high':
        return 'bg-orange-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-white'
      case 'low':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getScamTypeColor = (type: ScamType) => {
    const colors = {
      phishing: 'bg-red-500/20 text-red-300 border-red-500/30',
      investment: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      romance: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'tech-support': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      cryptocurrency: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      shopping: 'bg-green-500/20 text-green-300 border-green-500/30',
      employment: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      lottery: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      charity: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    }
    return colors[type] || colors.other
  }

  return (
    <section
      ref={sectionRef}
      id="scam-feed"
      className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl opacity-50" />

      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Community Scam Reports
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stay informed about the latest scams reported by our community. Help others by sharing
              your experiences.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/60 border-gray-700 text-white hover:border-blue-500/50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Scam Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Types
                </SelectItem>
                <SelectItem value="phishing" className="text-white hover:bg-gray-700">
                  Phishing
                </SelectItem>
                <SelectItem value="investment" className="text-white hover:bg-gray-700">
                  Investment
                </SelectItem>
                <SelectItem value="romance" className="text-white hover:bg-gray-700">
                  Romance
                </SelectItem>
                <SelectItem value="tech-support" className="text-white hover:bg-gray-700">
                  Tech Support
                </SelectItem>
                <SelectItem value="cryptocurrency" className="text-white hover:bg-gray-700">
                  Cryptocurrency
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/60 border-gray-700 text-white hover:border-blue-500/50 transition-colors">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Severities
                </SelectItem>
                <SelectItem value="critical" className="text-white hover:bg-gray-700">
                  Critical
                </SelectItem>
                <SelectItem value="high" className="text-white hover:bg-gray-700">
                  High
                </SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-gray-700">
                  Medium
                </SelectItem>
                <SelectItem value="low" className="text-white hover:bg-gray-700">
                  Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ScrollReveal>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <ScrollReveal key={report.$id} delay={index * 0.1} direction="up">
              <Card className="scam-card hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 group border-l-4 border-l-blue-500/20 hover:border-l-blue-400 bg-gray-800/60 backdrop-blur-sm border-gray-700/50">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-300 transition-colors text-white">
                      {report.title}
                    </CardTitle>
                    <Badge className={`${getSeverityColor(report.severity)} animate-pulse`}>
                      {report.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {new Date(report.$createdAt!).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-3 text-gray-300">
                    {report.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getScamTypeColor(report.scamType)}>{report.scamType}</Badge>
                    {report.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs hover:bg-blue-500/10 transition-colors border-gray-600 text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {report.scamUrl !== 'N/A' && (
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 truncate">{report.scamUrl}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-400 hover:scale-110 transition-all duration-200">
                        <ThumbsUp className="h-4 w-4" />
                        {report.upvotes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 hover:scale-110 transition-all duration-200">
                        <ThumbsDown className="h-4 w-4" />
                        {report.downvotes}
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:scale-105 transition-transform duration-200 bg-transparent border-gray-600 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/50"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold mb-2 text-white">No reports found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="hover:scale-105 transition-all duration-300 min-w-48 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Reports'
              )}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
