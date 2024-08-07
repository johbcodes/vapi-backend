import { logError } from '../config/logger.js';
import { Permission } from '../models/index.js';
import { adminPerms } from './data.js';

export const seedPermissions = async () => {
  try {
    console.dir(adminPerms.subscriptions);
    for (const category in adminPerms) {
      if (Object.prototype.hasOwnProperty.call(adminPerms, category)) {
        const permissions = adminPerms[category];
        for (const permission of permissions) {
          console.log('Creating Permission: ' + permission);
          await Permission.create({ name: permission });
        }
      }
    }
    console.log('All permissions created successfully');
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
  }
};
