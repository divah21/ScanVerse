import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ScamVerse - Scam Reporting & Analysis Platform',
  description:
    'Report scams, analyze suspicious URLs, and protect your community with ScamVerse - the modern scam detection platform.',
  generator: 'ScamVerse',
  keywords: [
    'scam reporting',
    'fraud detection',
    'URL analysis',
    'cybersecurity',
    'phishing protection',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
