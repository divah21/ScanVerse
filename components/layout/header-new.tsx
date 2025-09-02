'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white/70 backdrop-blur-sm border-b border-gray-200/30'
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <img
            src="/logo.svg"
            alt="ScamVerse"
            className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 font-medium hover:scale-105 transition-all duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/report"
            className="text-gray-700 hover:text-gray-900 font-medium hover:scale-105 transition-all duration-200 relative group"
          >
            Report Scam
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/analyze"
            className="text-gray-700 hover:text-gray-900 font-medium hover:scale-105 transition-all duration-200 relative group"
          >
            Analyze URL
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/admin"
            className="text-gray-700 hover:text-gray-900 font-medium hover:scale-105 transition-all duration-200 relative group"
          >
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            className="bg-gradient-primary hover:opacity-90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/report">
              <Shield className="mr-2 h-4 w-4" />
              Get Protected
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-gray-700 hover:bg-gray-100 hover:scale-110 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </div>
        </Button>
      </div>

      <div
        className={`md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-200 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/report"
            className="block text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-200 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Report Scam
          </Link>
          <Link
            href="/analyze"
            className="block text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-200 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Analyze URL
          </Link>
          <Link
            href="/admin"
            className="block text-gray-700 hover:text-gray-900 hover:translate-x-2 transition-all duration-200 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Admin
          </Link>
          <div className="pt-2">
            <Button
              asChild
              className="w-full bg-gradient-primary hover:opacity-90 border-0 shadow-lg"
            >
              <Link href="/report" onClick={() => setIsMenuOpen(false)}>
                <Shield className="mr-2 h-4 w-4" />
                Get Protected
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
