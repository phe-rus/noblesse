import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

type AuthenticationCheck = (args: AccessArgs<User>) => boolean

export const publicAccess: AuthenticationCheck = () => {
  return true
}
