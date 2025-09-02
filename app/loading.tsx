'use client'

import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-emerald-900">Loading ScamVerse</h2>
          <p className="text-emerald-600">Preparing your security dashboard...</p>
        </div>
        {/* Loading progress animation */}
        <div className="w-64 h-2 bg-emerald-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"
            style={{ width: '70%', animation: 'loading-progress 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
