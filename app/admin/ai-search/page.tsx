import { AdminLayout } from '@/components/admin/admin-layout'
import AIAnalysisComponent from '@/components/analyze/ai-analysis'

export default function AdminAISearchPage() {
  // Mock user data - bypassing auth for now
  const mockUser = {
    name: 'Admin User',
    email: 'admin@scamverse.com',
    avatar: '/placeholder-user.jpg',
    role: 'Administrator',
  }

  return (
    <AdminLayout currentUser={mockUser}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Search & Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Advanced AI-powered URL analysis and scam detection tools
          </p>
        </div>

        {/* AI Analysis Component */}
        <AIAnalysisComponent />

        {/* Additional Admin Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI Analysis Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total AI Analyses:</span>
                <span className="font-medium text-gray-900 dark:text-white">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">High Risk Detected:</span>
                <span className="font-medium text-red-600 dark:text-red-400">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">False Positives:</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Accuracy Rate:</span>
                <span className="font-medium text-green-600 dark:text-green-400">94.5%</span>
              </div>
            </div>
          </div>

          {/* Recent AI Analyses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent AI Analyses
            </h3>
            <div className="space-y-3">
              {[
                { url: 'suspicious-crypto.com', risk: 'Critical', time: '2 min ago' },
                { url: 'fake-bank-login.net', risk: 'High', time: '15 min ago' },
                { url: 'legitimate-site.com', risk: 'Low', time: '1 hour ago' },
                { url: 'phishing-attempt.org', risk: 'Critical', time: '2 hours ago' },
              ].map((analysis, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white truncate">{analysis.url}</p>
                    <p className="text-gray-500 dark:text-gray-400">{analysis.time}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      analysis.risk === 'Critical'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : analysis.risk === 'High'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}
                  >
                    {analysis.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
