import { useState, useEffect } from 'react'
import { account } from '@/lib/appwrite'
import { User } from '@/types/scam'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      setLoading(true)
      const currentUser = await account.get()
      setUser({
        $id: currentUser.$id,
        email: currentUser.email,
        name: currentUser.name,
        role: 'user', // Default role, should be fetched from user collection
        verified: currentUser.emailVerification,
      })
    } catch (error) {
      console.log('No user session found')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await account.createEmailPasswordSession(email, password)
      await checkUser()
      return true
    } catch (error: any) {
      setError(error.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      setLoading(true)
      await account.create('unique()', email, password, name)
      await login(email, password)
      return true
    } catch (error: any) {
      setError(error.message || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await account.deleteSession('current')
      setUser(null)
      return true
    } catch (error: any) {
      setError(error.message || 'Logout failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const sendPasswordReset = async (email: string) => {
    try {
      setError(null)
      await account.createRecovery(email, `${window.location.origin}/reset-password`)
      return true
    } catch (error: any) {
      setError(error.message || 'Password reset failed')
      return false
    }
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    sendPasswordReset,
    checkUser,
  }
}
