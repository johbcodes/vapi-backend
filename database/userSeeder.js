import { userDemoData } from './data.js';
import User from '../models/User.model.js';
import Role from '../models/Role.model.js';
import { logError } from '../config/logger.js';

export const seedUsers = async () => {
  try {
    await User.deleteMany();

    for (const item of userDemoData) {
      const user = item.user;

      const roleName = item.role && item.role.name; // Check if role and role.name are defined
      if (!roleName) {
        console.log('Role name is undefined or null:', user);
        continue; // Skip to the next iteration
      }

      const role = await Role.findOne({ name: roleName });
      if (!role) {
        console.log('Role not found:', user);
        continue; // Skip to the next iteration
      }

      user.roles = role._id;
      let newUser = await User.create(user);

      console.log('User Inserted:', newUser);
    }
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
    process.exit(1);
  } finally {
    process.exit();
  }
};
