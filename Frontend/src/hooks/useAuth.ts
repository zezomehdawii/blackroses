'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'ciso' | 'compliance-manager' | 'auditor' | 'viewer'
  organization: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/auth/me')
        // const data = await response.json()
        
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Mock authenticated user
        const mockUser: User = {
          id: 1,
          email: 'admin@company.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          organization: 'Main Organization',
          isActive: true
        }
        
        setUser(mockUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockUser: User = {
        id: 1,
        email,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        organization: 'Main Organization',
        isActive: true
      }
      
      setUser(mockUser)
    } catch (error) {
      throw new Error('Invalid credentials')
    }
  }

  const logout = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/auth/logout', { method: 'POST' })
      
      setUser(null)
    } catch (error) {
      throw new Error('Logout failed')
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    
    // Define role-based permissions
    const rolePermissions: Record<User['role'], string[]> = {
      'admin': ['*'], // All permissions
      'ciso': ['read', 'write', 'approve', 'configure'],
      'compliance-manager': ['read', 'write', 'approve'],
      'auditor': ['read'],
      'viewer': ['read']
    }
    
    const userPermissions = rolePermissions[user.role]
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Standalone hook without provider (for simpler usage)
export function useAuthSimple() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const mockUser: User = {
          id: 1,
          email: 'admin@company.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          organization: 'Main Organization',
          isActive: true
        }
        
        setUser(mockUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
