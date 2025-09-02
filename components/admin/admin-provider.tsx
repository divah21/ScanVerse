'use client'

import type React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'
import type { Models } from 'appwrite'

interface AdminContextType {
  user: Models.User<Models.Preferences> | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await account.get()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password)
      const currentUser = await account.get()
      setUser(currentUser)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Check if user is admin (in real app, this would check user roles)
  const isAdmin = user?.email === 'admin@scamverse.com' || user?.labels?.includes('admin')

  return (
    <AdminContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
