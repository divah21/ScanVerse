import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, UserPlus, Settings, Shield } from 'lucide-react'

export default function AdminUsersPage() {
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
              User Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              User Settings
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,643</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">+127 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,892</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">86.7% active rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">21.9% conversion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Today</CardTitle>
              <UserPlus className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Above average</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management Features</CardTitle>
            <CardDescription>Comprehensive user management system coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced User Management</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Full user management features including role-based access control, user analytics,
                bulk operations, and detailed user profiles will be available soon.
              </p>
              <div className="grid gap-3 md:grid-cols-3 max-w-2xl mx-auto">
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Users className="h-6 w-6 mb-2" />
                  <span>User Profiles</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Permissions</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Bulk Actions</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
