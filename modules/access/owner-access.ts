import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

type UserRole = 'super-admin' | 'owner' | string
type AuthenticationCheck = (args: AccessArgs<User>) => boolean

const AUTHORIZED_ROLES: UserRole[] = ['super-admin', 'owner']

export const ownerAccess: AuthenticationCheck = ({ req: { user } }) => {
  if (!user) return false
  return AUTHORIZED_ROLES.includes(user.roles)
}
