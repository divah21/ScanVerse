'use client'

import { Shield, AlertTriangle, FileText, Upload } from 'lucide-react'

export function ReportHero() {
  return (
    <section className="py-16 bg-gradient-emerald-subtle">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Report a <span className="text-gradient-emerald">Scam</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Help protect others by sharing your experience. Your report will be reviewed and added
              to our community database to prevent future victims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="text-center space-y-2">
              <FileText className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Detailed Report</h3>
              <p className="text-sm text-muted-foreground">
                Provide comprehensive information about the scam
              </p>
            </div>
            <div className="text-center space-y-2">
              <Upload className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Upload Evidence</h3>
              <p className="text-sm text-muted-foreground">
                Include screenshots, emails, or other proof
              </p>
            </div>
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Help Others</h3>
              <p className="text-sm text-muted-foreground">
                Your report helps protect the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
