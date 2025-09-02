'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, Search, Users } from 'lucide-react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate heading with stagger effect
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.3'
        )

      // Animate blinking stars
      gsap.utils.toArray('.star').forEach((star, i) => {
        gsap.to(star as Element, {
          opacity: 0,
          duration: 0.5 + Math.random() * 1.5,
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'power2.inOut',
        })

        // Add floating motion to some stars
        if (i % 3 === 0) {
          gsap.to(star as Element, {
            y: -10 + Math.random() * 20,
            x: -5 + Math.random() * 10,
            duration: 3 + Math.random() * 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })
        }
      })

      // Animate stats with scroll trigger
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Floating animation for background elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden"
    >
      {/* Animated background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      {/* Blinking stars */}
      <div className="absolute inset-0">
        <div className="star star-1 absolute top-20 left-[10%] w-1 h-1 bg-white rounded-full"></div>
        <div className="star star-2 absolute top-32 left-[20%] w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
        <div className="star star-3 absolute top-16 left-[30%] w-1 h-1 bg-cyan-300 rounded-full"></div>
        <div className="star star-4 absolute top-40 left-[40%] w-2 h-2 bg-white rounded-full"></div>
        <div className="star star-5 absolute top-24 left-[50%] w-1 h-1 bg-blue-200 rounded-full"></div>
        <div className="star star-6 absolute top-36 left-[60%] w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="star star-7 absolute top-20 left-[70%] w-1 h-1 bg-cyan-200 rounded-full"></div>
        <div className="star star-8 absolute top-44 left-[80%] w-1 h-1 bg-blue-200 rounded-full"></div>
        <div className="star star-9 absolute top-28 left-[90%] w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="star star-10 absolute top-48 right-[10%] w-1 h-1 bg-cyan-200 rounded-full"></div>
        <div className="star star-11 absolute top-32 right-[20%] w-2 h-2 bg-white rounded-full"></div>
        <div className="star star-12 absolute top-40 right-[30%] w-1 h-1 bg-blue-300 rounded-full"></div>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-repeat opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating animated elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 floating-animation" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-secondary rounded-full blur-3xl opacity-15 floating-animation-delayed" />
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-primary rounded-full blur-3xl opacity-10 floating-animation-slow" />
      <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-gradient-secondary rounded-full blur-2xl opacity-25 floating-animation" />

      <div className="container px-4 relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl space-y-6 text-white">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight"
              >
                Protect Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Digital World
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-gray-300 text-pretty leading-relaxed"
              >
                Advanced AI-powered scam detection, community-driven reporting, and real-time URL
                analysis to keep you safe online.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 pulse-glow"
              >
                <Link href="/report">
                  <Shield className="mr-2 h-5 w-5" />
                  Report a Scam
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <Link href="/analyze">
                  <Search className="mr-2 h-5 w-5" />
                  Analyze URL
                </Link>
              </Button>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                </div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-xs text-gray-400">Scams Reported</div>
              </div>
              <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <Search className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <div className="text-2xl font-bold text-white">5,832</div>
                <div className="text-xs text-gray-400">URLs Analyzed</div>
              </div>
              <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                </div>
                <div className="text-2xl font-bold text-white">98.7%</div>
                <div className="text-xs text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                </div>
                <div className="text-2xl font-bold text-white">12.4K</div>
                <div className="text-xs text-gray-400">Protected Users</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="hidden lg:block">
            <div className="relative flex justify-center">
              <img
                src="/hero-illustration.svg"
                alt="ScamVerse Protection"
                className="w-full h-auto max-w-lg xl:max-w-xl hover:scale-105 transition-transform duration-700 drop-shadow-2xl image-hero"
              />
              {/* Additional glow effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-10 scale-125" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
