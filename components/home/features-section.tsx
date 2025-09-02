'use client'

import { Shield, Zap, Users, BarChart3, Lock, Globe } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      title: 'AI-Powered Analysis',
      description:
        'Advanced machine learning algorithms analyze URLs and detect suspicious patterns in real-time with 98.7% accuracy.',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Community Protection',
      description:
        'Crowdsourced reporting system that helps protect millions of users worldwide through collaborative intelligence.',
      icon: Users,
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Real-Time Monitoring',
      description:
        'Continuous monitoring of reported sites and automatic updates to threat databases for instant protection.',
      icon: BarChart3,
      gradient: 'from-green-400 to-teal-500',
    },
    {
      title: 'Secure & Private',
      description:
        'Your data is encrypted end-to-end and protected. We never share personal information with third parties.',
      icon: Lock,
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      title: 'Global Coverage',
      description:
        'Protecting users across all countries and languages with localized threat intelligence and 24/7 monitoring.',
      icon: Globe,
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Verified Reports',
      description:
        'All reports are reviewed by our expert team and community moderators to ensure accuracy and reliability.',
      icon: Shield,
      gradient: 'from-emerald-400 to-green-500',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Add floating animation to feature icons
      gsap.utils.toArray('.feature-icon').forEach((icon: any, i: number) => {
        gsap.to(icon, {
          y: -8,
          duration: 2 + Math.random(),
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
          ease: 'sine.inOut',
        })
      })

      // Add particle effect
      gsap.utils.toArray('.feature-particle').forEach((particle: any, i: number) => {
        gsap.to(particle, {
          x: 20 + Math.random() * 40,
          y: -20 + Math.random() * 40,
          opacity: 0.3,
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
      className="py-24 bg-gradient-to-br from-slate-700 via-gray-800 to-slate-700 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="feature-particle absolute top-20 left-[10%] w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="feature-particle absolute top-40 left-[20%] w-1 h-1 bg-cyan-400/40 rounded-full"></div>
        <div className="feature-particle absolute top-60 left-[80%] w-1.5 h-1.5 bg-teal-400/40 rounded-full"></div>
        <div className="feature-particle absolute top-32 right-[10%] w-1 h-1 bg-indigo-400/40 rounded-full"></div>
      </div>

      <div className="container px-4 relative max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              ScamVerse
            </span>
            ?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Our platform combines cutting-edge technology with community collaboration to provide
            the most comprehensive scam protection available in the digital world.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="group p-8 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-600/50 relative overflow-hidden hover:bg-gray-700/80"
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-transparent to-cyan-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`feature-icon w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500" />
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/features-illustration.svg"
              alt="ScamVerse Features"
              className="w-full h-auto max-w-xl mx-auto hover:scale-105 transition-transform duration-700 drop-shadow-xl image-rounded-xl image-with-shadow"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Advanced Protection{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Technology
                </span>
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our cutting-edge AI algorithms and community-driven approach ensures comprehensive
                protection against the latest scam techniques and fraudulent activities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Lightning Fast Analysis</h4>
                  <p className="text-gray-300">Get results in under 3 seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Global Community</h4>
                  <p className="text-gray-300">Join 12,000+ active protection agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
