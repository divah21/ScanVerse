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
      title: 'View Statistics',
      description: 'Explore the latest data on scam trends and prevention',
      icon: BarChart3,
      href: '/stats',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Community Forum',
      description: 'Connect with others who have experienced similar scams',
      icon: Users,
      href: '/community',
      gradient: 'from-purple-500 to-violet-500',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Create floating particles
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-purple-400/30 rounded-full'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        sectionRef.current?.appendChild(particle)

        gsap.to(particle, {
          duration: 3 + Math.random() * 4,
          y: -50 - Math.random() * 100,
          x: -20 + Math.random() * 40,
          opacity: 0,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'power2.out',
        })
      }

      // Animate cards on scroll
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Hover animations for cards
      if (cards) {
        Array.from(cards).forEach((card) => {
          const cardElement = card as HTMLElement

          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: 'power2.out',
            })
          })

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        })
      }
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Take Action Now
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our community in the fight against scams. Whether you want to report, analyze, or
            learn, we've got you covered.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={index}
                className="group border-gray-700/50 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/60 transition-all duration-300 hover:border-purple-500/50"
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto w-12 h-12 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-purple-300 transition-colors">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
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
