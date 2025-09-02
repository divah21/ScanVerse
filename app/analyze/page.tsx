import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AnalysisHero } from '@/components/analyze/analysis-hero'
import { UrlAnalyzer } from '@/components/analyze/url-analyzer'
import AIAnalysisComponent from '@/components/analyze/ai-analysis'

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnalysisHero />
        <UrlAnalyzer />
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  AI-Powered Deep Analysis
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Get comprehensive AI analysis of URLs for advanced scam detection
                </p>
              </div>
              <AIAnalysisComponent />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
