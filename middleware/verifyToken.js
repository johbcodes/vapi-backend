import jwt from 'jsonwebtoken';
import { logError } from '../config/logger.js';

export const verifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return decodedToken;
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
    throw new Error('Invalid or expired token');
  }
};
