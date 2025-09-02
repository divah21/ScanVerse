import { AdminLayout } from '@/components/admin/admin-layout'
import { ReportManagement } from '@/components/admin/report-management'

export default function AdminReportsPage() {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Reports Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Review and manage scam reports from users
            </p>
          </div>
        </div>
        <ReportManagement />
      </div>
    </AdminLayout>
  )
}
