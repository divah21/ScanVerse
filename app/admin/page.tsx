import AdminDashboard from '@/components/admin/admin-dashboard'
import { AdminLayout } from '@/components/admin/admin-layout'

export default function AdminPage() {
  // Mock user data - bypassing auth for now
  const mockUser = {
    name: 'Admin User',
    email: 'admin@scamverse.com',
    avatar: '/placeholder-user.jpg',
    role: 'Administrator',
  }

  return (
    <AdminLayout currentUser={mockUser}>
      <AdminDashboard />
    </AdminLayout>
  )
}
