import mongoose from 'mongoose';
import { logError } from './logger.js';
import dotenv from 'dotenv';

dotenv.config();

// Connection to MongoDB
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error occurred:', { error: error.message, stack: error.stack });
    logError.error('Error occurred:', { error: error.message, stack: error.stack });
    process.exit(1);
  }
};

export default connectDB;
