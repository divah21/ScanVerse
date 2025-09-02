'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Search, BarChart3, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function QuickActions() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const actions = [
    {
      title: 'Report a Scam',
      description: "Submit details about fraudulent activities you've encountered",
      icon: Shield,
      href: '/report',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'Analyze URL',
      description: 'Check if a website is safe using our AI-powered analysis',
      icon: Search,
      href: '/analyze',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'View Dashboard',
      description: 'Access admin tools and manage reported content',
      icon: BarChart3,
      href: '/admin',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Community Feed',
      description: 'Browse recent scam reports from the community',
      icon: Users,
      href: '#scam-feed',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Add floating animation to action icons
      gsap.utils.toArray('.action-icon').forEach((icon: any, i: number) => {
        gsap.to(icon, {
          y: -6,
          duration: 2 + Math.random() * 0.5,
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
          ease: 'sine.inOut',
        })
      })

      // Add particle effect
      gsap.utils.toArray('.action-particle').forEach((particle: any, i: number) => {
        gsap.to(particle, {
          x: 15 + Math.random() * 30,
          y: -15 + Math.random() * 30,
          opacity: 0.4,
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'sine.inOut',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="action-particle absolute top-20 left-[15%] w-1.5 h-1.5 bg-purple-400/30 rounded-full"></div>
        <div className="action-particle absolute top-40 left-[25%] w-1 h-1 bg-blue-400/30 rounded-full"></div>
        <div className="action-particle absolute top-60 left-[75%] w-1.5 h-1.5 bg-pink-400/30 rounded-full"></div>
        <div className="action-particle absolute bottom-40 right-[15%] w-1 h-1 bg-indigo-400/30 rounded-full"></div>
      </div>

      <div className="container px-4 max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Take Action{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Now
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose how you want to contribute to our mission of creating a safer internet.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon

            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gray-900/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/70"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`action-icon w-16 h-16 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    variant="outline"
                  >
                    <Link href={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
