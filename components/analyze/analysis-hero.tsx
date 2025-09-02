'use client'

import { Search, Shield, Zap, AlertTriangle } from 'lucide-react'

export function AnalysisHero() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="flex justify-center lg:justify-start">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                <span className="text-gradient-primary">AI-Powered</span> URL Analysis
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Instantly check if a website is safe using our advanced AI algorithms. Get real-time
                threat detection and detailed security analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
              <div className="text-center lg:text-left space-y-2">
                <Zap className="h-8 w-8 text-primary mx-auto lg:mx-0" />
                <h3 className="font-semibold">Instant Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get results in seconds with real-time processing
                </p>
              </div>
              <div className="text-center lg:text-left space-y-2">
                <Shield className="h-8 w-8 text-primary mx-auto lg:mx-0" />
                <h3 className="font-semibold">AI Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms detect phishing and scam patterns
                </p>
              </div>
              <div className="text-center lg:text-left space-y-2">
                <AlertTriangle className="h-8 w-8 text-primary mx-auto lg:mx-0" />
                <h3 className="font-semibold">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive threat scoring and detailed reports
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Illustration */}
          <div className="hidden lg:block">
            <img
              src="/analysis-illustration.svg"
              alt="AI URL Analysis"
              className="w-full h-auto max-w-lg mx-auto hover:scale-105 transition-transform duration-500 image-rounded-xl image-with-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
