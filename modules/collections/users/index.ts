import { ownerAccess, publicAccess, superAdmin } from '@modules/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
    lockTime: 10 * 60 * 1000, // Lock after failed attempts (10 min)
    maxLoginAttempts: 5, // Prevent brute-force attacks
    loginWithUsername: {
      allowEmailLogin: true,
      requireUsername: true,
      requireEmail: true,
    },
    cookies: {
      sameSite: 'None',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
    verify: true,
    tokenExpiration: 7 * 24 * 60 * 60 * 1000, // 7days hours
  },
  access: {
    read: ownerAccess,
    create: publicAccess,
    update: ownerAccess,
    delete: ownerAccess,
    admin: superAdmin,
    unlock: superAdmin,
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      saveToJWT: true,
      defaultValue: 'owner',
      options: ['super-admin', 'owner', 'guest'],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
