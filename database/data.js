export const userDemoData = [
  {
    user: {
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Doe',
      email: 'admin@gmail.com',
      password: 'admin',
      phoneNumber: '1234567890',
    },
    role: { name: 'Admin' },
  },
  {
    user: {
      username: 'User',
      firstName: 'User',
      lastName: 'Doe',
      email: 'user@gmail.com',
      password: 'user',
      phoneNumber: '1234567891',
    },
    role: { name: 'User' },
  },
];

export const roles = [
  { name: 'Admin' },
  { name: 'User' },
];

export const adminPerms = {
  roles: [
    'view-role',
    'edit-role',
    'create-role',
    'delete-role',
    'add-role-permissions',
  ],
  permissions: [
    'view-permission',
    'edit-permission',
    'create-permission',
    'delete-permission',
  ],
  users: [
    'view-user',
    'create-user',
    'edit-user',
    'delete-user',
    'assign-user-role',
    'assign-user-direct-permission',
  ],
  plans: ['view-plan', 'edit-plan', 'create-plan', 'delete-plan'],
  subscriptions: [
    'view-all-subscriptions',
    'create-subscription',
    'view-subscription',
    'edit-subscription',
    'delete-subscription',
  ],
};
export const userPerms = {};
