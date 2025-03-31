import { ownerAccess, superAdmin } from '@modules/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: ownerAccess,
    create: ownerAccess,
    update: ownerAccess,
    delete: ownerAccess,
    admin: superAdmin,
    unlock: superAdmin,
  },
  admin: {},
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ req: { file, user, data }, operation }) => {
        if ((operation === 'create' || operation === 'update') && file) {
          data!.prefix = `/${user?.id}/${user?.username}`
          file.name = `${user?.id}.${file.name.split('.')[1]}`
          data!.alt = `${user?.username}-${file.name.split('.')[0]}`
        }
      },
    ],
  },
  upload: true,
}
