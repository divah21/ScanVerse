'use client'

import { Button } from '@/components/ui/button'
import { Shield, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CallToActionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background elements
      gsap.to('.cta-float-1', {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
      })

      gsap.to('.cta-float-2', {
        y: 20,
        x: -15,
        rotation: -360,
        duration: 10,
        ease: 'none',
        repeat: -1,
      })

      gsap.to('.cta-float-3', {
        y: -15,
        x: 25,
        scale: 1.1,
        duration: 6,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Add particle animation
      gsap.utils.toArray('.cta-particle').forEach((particle: any, i: number) => {
        gsap.to(particle, {
          x: 20 + Math.random() * 40,
          y: -20 + Math.random() * 40,
          opacity: 0.6,
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
      className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Enhanced floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl cta-float-1" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-pink-400/15 rounded-full blur-2xl cta-float-2" />
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl cta-float-3" />
      <div className="absolute bottom-40 right-20 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl cta-float-1" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cta-particle absolute top-20 left-[10%] w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="cta-particle absolute top-40 left-[20%] w-1.5 h-1.5 bg-purple-400/40 rounded-full"></div>
        <div className="cta-particle absolute top-60 left-[80%] w-2 h-2 bg-pink-400/40 rounded-full"></div>
        <div className="cta-particle absolute bottom-40 right-[10%] w-1 h-1 bg-indigo-400/40 rounded-full"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20.5L20.5 20L20 19.5L19.5 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container px-4 relative max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Join the Fight Against Digital Fraud</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Protect Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Digital Life?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who trust ScamVerse to keep them safe from online threats.
              Start protecting yourself and your community today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-white text-indigo-900 hover:bg-gray-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/report">
                <Shield className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <Link href="/analyze">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="pt-8 text-sm text-blue-200/80">
            🛡️ <strong>100% Free</strong> • ⚡ <strong>Instant Setup</strong> • 🔒{' '}
            <strong>Privacy Protected</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
