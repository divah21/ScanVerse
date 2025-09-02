'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BarChart3,
  Users,
  AlertTriangle,
  Shield,
  Settings,
  LogOut,
  Menu,
  Home,
  FileText,
  PieChart,
  UserCheck,
  Zap,
  Bell,
  Search,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Brain,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
  currentUser?: {
    name: string
    email: string
    avatar?: string
    role: string
  }
}

const navigation = [
  {
    name: 'Overview',
    href: '/admin',
    icon: Home,
    current: true,
    badge: null,
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    current: false,
    badge: '23',
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: PieChart,
    current: false,
    badge: null,
  },
  {
    name: 'AI Search',
    href: '/admin/ai-search',
    icon: Brain,
    current: false,
    badge: 'New',
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    current: false,
    badge: null,
  },
  {
    name: 'Scam Database',
    href: '/admin/scams',
    icon: Shield,
    current: false,
    badge: null,
  },
  {
    name: 'URL Analysis',
    href: '/admin/analysis',
    icon: Zap,
    current: false,
    badge: '15',
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    current: false,
    badge: null,
  },
]

export function AdminLayout({ children, currentUser }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  // Update current navigation item based on pathname
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href || (item.href === '/admin' && pathname === '/admin'),
  }))

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      {/* Logo/Brand */}
      <div
        className={`flex h-16 items-center border-b border-slate-800 ${sidebarCollapsed ? 'px-3 justify-center' : 'px-6'}`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold">ScamVerse</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <div className={`border-b border-slate-800 ${sidebarCollapsed ? 'px-3 py-3' : 'px-6 py-3'}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`text-slate-400 hover:text-white hover:bg-slate-800 ${sidebarCollapsed ? 'w-8 h-8 p-0' : 'w-full justify-start'}`}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-1 py-6 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
        {updatedNavigation.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-lg text-sm font-medium transition-all duration-200 relative',
                sidebarCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5',
                item.current
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
              onClick={(e) => {
                // Only close mobile sidebar, keep desktop sidebar collapsed state unchanged
                setSidebarOpen(false)
                // Note: We intentionally do NOT expand the sidebar when clicking menu items
              }}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                <Icon
                  className={cn(
                    'h-5 w-5 transition-transform duration-200',
                    item.current ? 'scale-110' : 'group-hover:scale-105'
                  )}
                />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </div>
              {item.badge && !sidebarCollapsed && (
                <Badge
                  variant={item.badge === 'New' ? 'default' : 'secondary'}
                  className={cn(
                    'text-xs',
                    item.badge === 'New'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-slate-700 text-slate-200'
                  )}
                >
                  {item.badge}
                </Badge>
              )}
              {item.badge && sidebarCollapsed && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              )}
            </a>
          )
        })}
      </nav>

      {/* User Profile & Actions */}
      <div className={`border-t border-slate-800 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
        <div
          className={`mb-4 flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              {currentUser?.name?.slice(0, 2)?.toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser?.name || 'Admin User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {currentUser?.role || 'Administrator'}
              </p>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="space-y-2 flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-slate-300 hover:text-white hover:bg-slate-800"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-1 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>

              <div className="hidden sm:block">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Admin Dashboard
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-600 hover:bg-red-700">
                  3
                </Badge>
              </Button>

              {/* User Avatar */}
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-xs">
                  {currentUser?.name?.slice(0, 2)?.toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
