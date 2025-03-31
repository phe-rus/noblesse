import type { User } from '@/payload-types'
import type { Permissions } from 'payload'

// Common interface for authentication credentials
interface BaseAuthCredentials {
  password: string
}

// Email-based credential interface
interface EmailCredentials {
  email: string
}

// Account creation credentials
export interface CreateAccountCredentials extends BaseAuthCredentials, EmailCredentials {
  username: string
  passwordConfirm: string
}

// Login credentials
export interface LoginCredentials extends BaseAuthCredentials {
  email?: string
  username?: string
}

// Password reset credentials
export interface ResetPasswordCredentials extends BaseAuthCredentials {
  token: string
  passwordConfirm: string
}

// Type aliases for functions
export type CreateAccount = (args: CreateAccountCredentials) => Promise<User>
export type Login = (args: LoginCredentials) => Promise<User>
export type Logout = () => Promise<void>
export type ForgotPassword = (args: EmailCredentials) => Promise<unknown>
export type ResetPassword = (args: ResetPasswordCredentials) => Promise<User>

// Context interface
export interface AuthContext {
  user: User | null
  permissions: Permissions | null
  loading: boolean
  error: string | null
  create: CreateAccount
  login: Login
  logout: Logout
  forgotPassword: ForgotPassword
  resetPassword: ResetPassword
  setUser: (user: User | null) => void
  setPermissions: (permissions: Permissions | null) => void
}
