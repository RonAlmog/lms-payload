import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // registering is always allowed
    create: () => true,
  },
  // auto adding email, password, salt fields
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7,
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 10 // 10 min
  },
  fields: [],
};
