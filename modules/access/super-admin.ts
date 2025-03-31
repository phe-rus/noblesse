import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

export const superAdmin = ({ req: { user } }: AccessArgs<User>): boolean => {
  return Boolean(user?.roles === 'super-admin')
}
