import { logError } from '../config/logger.js';
import { Role, Permission } from '../models/index.js';
import { adminPerms, userPerms } from './data.js';

export const seedRolePermission = async () => {
  try {
    // Admin role permissions
    const adminRole = await Role.findOne({ name: 'Admin' });
    if (adminRole) {
      for (const category in adminPerms) {
        if (Object.prototype.hasOwnProperty.call(adminPerms, category)) {
          const permissions = adminPerms[category];
          for (const permission of permissions) {
            const foundPermission = await Permission.findOne({ name: permission });

            if (foundPermission) {
              if (!adminRole.permissions.includes(foundPermission._id)) {
                adminRole.permissions.push(foundPermission._id);
              }
            } else {
              console.warn(`Permission "${permission}" for Role Admin not found.`);
            }
          }
        }
      }
      await adminRole.save();
      console.log('Admin Role permissions updated successfully');
    } else {
      console.error('Admin role not found');
    }

    //   User role permissions
    const userRole = await Role.findOne({ name: 'User' });
    if (userRole) {
      for (const category in userPerms) {
        if (Object.prototype.hasOwnProperty.call(userPerms, category)) {
          const permissions = userPerms[category];
          for (const permission of permissions) {
            const foundPermission = await Permission.findOne({ name: permission });

            if (foundPermission) {
              if (!userRole.permissions.includes(foundPermission._id)) {
                userRole.permissions.push(foundPermission._id);
              }
            } else {
              console.warn(`Permission "${permission}" for role User not found.`);
            }
          }
        }
      }

      await userRole.save();
      console.log('User Role permissions updated successfully');
    } else {
      console.error('User role not found');
    }
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
  }
};
