'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add floating particles animation to footer
      gsap.utils.toArray('.footer-particle').forEach((particle: any, i: number) => {
        gsap.to(particle, {
          x: 10 + Math.random() * 20,
          y: -15 + Math.random() * 30,
          opacity: 0.3,
          duration: 5 + Math.random() * 3,
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 4,
          ease: 'sine.inOut',
        })
      })

      // Add subtle glow animation to logo
      gsap.to('.footer-logo', {
        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="border-t border-gray-700/50 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="footer-particle absolute top-10 left-[10%] w-1.5 h-1.5 bg-purple-400/20 rounded-full"></div>
        <div className="footer-particle absolute top-20 left-[30%] w-1 h-1 bg-pink-400/20 rounded-full"></div>
        <div className="footer-particle absolute top-15 right-[20%] w-1.5 h-1.5 bg-blue-400/20 rounded-full"></div>
        <div className="footer-particle absolute top-25 right-[40%] w-1 h-1 bg-indigo-400/20 rounded-full"></div>
        <div className="footer-particle absolute bottom-10 left-[60%] w-1 h-1 bg-cyan-400/20 rounded-full"></div>
      </div>

      <div className="container px-4 py-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="footer-logo h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold text-white">ScamVerse</span>
            </div>
            <p className="text-sm text-gray-300">
              Protecting communities through collaborative scam reporting and AI-powered analysis.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/report"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Report Scam
                </Link>
              </li>
              <li>
                <Link
                  href="/analyze"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  URL Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/feed"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Scam Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4 text-white">
            <h3 className="font-semibold ">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className=" hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/support" className=" hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 text-white">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className=" hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className=" hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className=" hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-white">
          <p>&copy; 2025 ScamVerse. All rights reserved. Built for community protection.</p>
        </div>
      </div>
    </footer>
  )
}
