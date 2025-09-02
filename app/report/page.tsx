import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ReportForm } from '@/components/report/report-form'
import { ReportHero } from '@/components/report/report-hero'

export default function ReportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ReportHero />
        <ReportForm />
      </main>
      <Footer />
    </div>
  )
}
