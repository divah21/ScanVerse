import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { ScamFeed } from '@/components/home/scam-feed'
import { QuickActions } from '@/components/home/quick-actions'
import { FeaturesSection } from '@/components/home/features-section'
import { CallToActionSection } from '@/components/home/cta-section'
import FloatingAIAssistant from '@/components/common/floating-ai-assistant'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <QuickActions />
        <ScamFeed />
        <CallToActionSection />
      </main>
      <Footer />
      <FloatingAIAssistant />
    </div>
  )
}
