import { seedRoles } from './rolesSeeder.js';
import { seedPermissions } from './permissionSeeder.js';
import mongoose from 'mongoose';
import { seedRolePermission } from './rolePermissionSeeder.js';
import { seedUsers } from './userSeeder.js';
import { seedPlans } from './planSeeder.js';
import dotenv from 'dotenv';
import { logError } from '../config/logger.js';

// Determine the environment
const env = process.env.NODE_ENV || 'development';

// Load environment variables based on the environment
dotenv.config({ path: `.env.${env}` });

const refreshDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
    process.exit(1);
  }

  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      if (collection.name !== 'system.indexes') {
        await mongoose.connection.db.dropCollection(collection.name);
      }
    }
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
  }
};

const seedAllData = async () => {
  await seedPlans();
  await seedRoles();
  await seedPermissions();
  await seedRolePermission();
  await seedUsers();
};

const start = async () => {
  await refreshDatabase();
  await seedAllData();
};

start();
