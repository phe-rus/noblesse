'use client'

import type { Permissions } from 'payload'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { User } from '@/payload-types'
import type {
  AuthContext,
  CreateAccount,
  ForgotPassword,
  Login,
  Logout,
  ResetPassword,
} from './types'
import { resthandler } from '@/lib/rest-handler'

const Context = createContext<AuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<Permissions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred'
    setError(errorMessage)
    return null
  }, [])

  const create = useCallback<CreateAccount>(
    async (args) => {
      try {
        setLoading(true)
        const newUser = await resthandler(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, args)
        if (!newUser) throw new Error('Failed to create user')
        setUser(newUser)
        return newUser
      } catch (err) {
        handleError(err)
        throw err instanceof Error ? err : new Error('An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const login = useCallback<Login>(
    async (args) => {
      try {
        setLoading(true)
        const loggedInUser = await resthandler(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
          args,
        )
        if (!loggedInUser) throw new Error('Failed to login')
        setUser(loggedInUser)
        return loggedInUser
      } catch (err) {
        handleError(err)
        throw err instanceof Error ? err : new Error('An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const logout = useCallback<Logout>(async () => {
    try {
      setLoading(true)
      await resthandler(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`)
      setUser(null)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [handleError])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      try {
        setLoading(true)
        const result = await resthandler(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
          args,
        )
        if (!result) throw new Error('Failed to process forgot password request')
        return result
      } catch (err) {
        handleError(err)
        throw err instanceof Error ? err : new Error('An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const resetPassword = useCallback<ResetPassword>(
    async (args) => {
      try {
        setLoading(true)
        const result = await resthandler(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
          args,
        )
        if (!result) throw new Error('Failed to reset password')
        setUser(result)
        return result
      } catch (err) {
        handleError(err)
        throw err instanceof Error ? err : new Error('An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true)
        const currentUser = await resthandler(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
          {},
          { method: 'GET' },
        )
        setUser(currentUser)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }

    void fetchMe()
  }, [handleError])

  const contextValue: AuthContext = {
    create,
    forgotPassword,
    login,
    logout,
    permissions,
    resetPassword,
    setPermissions,
    setUser,
    user,
    loading,
    error,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export const useAuth = (): AuthContext => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
