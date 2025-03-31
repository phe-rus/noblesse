import type { User } from '@/payload-types'
import type { Permissions } from 'payload'

// Common interface for authentication credentials
interface BaseAuthCredentials {
  password: string
}

interface ResetPasswordCredentials extends BaseAuthCredentials {
  passwordConfirm: string
  token: string
}

interface EmailCredentials {
  email: string
}

interface CreateAccountCredentials extends BaseAuthCredentials, EmailCredentials {
  username: string
}

interface LoginCredentials extends BaseAuthCredentials {
  email?: string
  username?: string
}

// Type aliases for functions
export type ResetPassword = (args: ResetPasswordCredentials) => Promise<User>
export type ForgotPassword = (args: EmailCredentials) => Promise<User>
export type CreateAccount = (args: CreateAccountCredentials) => Promise<User>
export type Login = (args: LoginCredentials) => Promise<User>
export type Logout = () => Promise<void>

// Context interface
export interface AuthContext {
  create: CreateAccount
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions: Permissions | null
  resetPassword: ResetPassword
  setPermissions: (permissions: Permissions | null) => void
  setUser: (user: User | null) => void
  loading: boolean
  user: User | null
  error: string | null
}
