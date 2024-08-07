import { logError } from '../config/logger.js';
import Role from '../models/Role.model.js';
import { roles } from './data.js';

export const seedRoles = async () => {
  try {
    await Role.insertMany(roles);

    console.log('Roles seeded successfully!');
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
  } finally{
    console.log("Roles Created Successfully")
  }
};
