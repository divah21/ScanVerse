'use client'

import { useEffect, useRef } from 'react'
import { TrendingUp, Shield, Users, Zap } from 'lucide-react'
import { AnimatedCounter } from '@/components/common/animated-counter'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      title: 'Total Reports',
      value: 1247,
      suffix: '',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-blue-600',
      description: 'Scam reports submitted by our community',
    },
    {
      title: 'URLs Protected',
      value: 5832,
      suffix: '',
      icon: Shield,
      gradient: 'from-purple-400 to-purple-600',
      description: 'Malicious websites blocked and flagged',
    },
    {
      title: 'Active Users',
      value: 12.4,
      suffix: 'K',
      icon: Users,
      gradient: 'from-pink-400 to-pink-600',
      description: 'Community members staying protected',
    },
    {
      title: 'Detection Speed',
      value: 2.3,
      suffix: 's',
      icon: Zap,
      gradient: 'from-green-400 to-green-600',
      description: 'Average time to analyze a URL',
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
          scale: 0.8,
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

      // Floating animation for background elements
      gsap.to('.stats-float-1', {
        y: -20,
        x: 10,
        rotation: 180,
        duration: 8,
        ease: 'none',
        repeat: -1,
      })

      gsap.to('.stats-float-2', {
        y: 15,
        x: -8,
        rotation: -180,
        duration: 10,
        ease: 'none',
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-5 translate-x-1/2 -translate-y-1/2 stats-float-1" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-5 -translate-x-1/2 translate-y-1/2 stats-float-2" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M20 20.5L20.5 20L20 19.5L19.5 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real-Time Protection{' '}
            <span className="text-transparent bg-clip-text bg-gradient-primary">Statistics</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            See how our community is actively fighting scams and protecting users worldwide with
            cutting-edge technology.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                {/* Background gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <div className="flex items-baseline">
                      <AnimatedCounter
                        end={stat.value}
                        className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300"
                      />
                      <span className="text-2xl font-bold text-gray-700 ml-1">{stat.suffix}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                    {stat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Hover border effect */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">These numbers update in real-time</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span>Live Data</span>
          </div>
        </div>
      </div>
    </section>
  )
}
