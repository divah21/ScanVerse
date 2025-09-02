'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types/scam'
import { useAuth } from '@/hooks/use-auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<boolean>
  sendPasswordReset: (email: string) => Promise<boolean>
  checkUser: () => Promise<void>
  isAdmin: boolean
  isModerator: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth()

  const isAdmin = auth.user?.role === 'admin'
  const isModerator = auth.user?.role === 'moderator' || isAdmin

  const value: AuthContextType = {
    ...auth,
    isAdmin,
    isModerator,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
