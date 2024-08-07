const ROLE = {
  Admin: 'admin',
  User: 'user',
};

const menuData = [
  {
    icon: 'grid-alt',
    text: 'Dashboard',
    active: true,
    link: '/dashboard',
    roles: [ROLE.Admin, ROLE.User],
  },
];

const menusByRole = {
  [ROLE.User]: menuData.filter((item) => item.roles && item.roles.includes(ROLE.User)),
  [ROLE.Admin]: menuData.filter(
    (item) => item.roles && item.roles.includes(ROLE.Admin)
  ),
};

// Export the menus by role and the roles constant
export { menusByRole, ROLE };
