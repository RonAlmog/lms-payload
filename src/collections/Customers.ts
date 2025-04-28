import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // registering is always allowed
    create: () => true,
  },
  auth: true, // auto adding email, password, salt fields
  fields: [],
}
