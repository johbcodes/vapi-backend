import { logError } from '../config/logger.js';
import { roleDb, usersDb } from '../data-access/index.js';
import jwt from 'jsonwebtoken';

export const getUserRoleId = async () => {
  let userRole = await roleDb.findOne({ name: 'User' });
  return userRole._id;
};

export const getUserDetail = async (userId) => {
  const user = await usersDb.findOne({ _id: userId });
  return user;
};


export const getUserRoleName = async (userId) => {
  try {
    const user = await usersDb.findOne({ _id: userId });
    if (user) {
      // Assuming the user.roles contains the role ID
      const userRole = await roleDb.findOne({ _id: user.roles });

      if (userRole) {
        return userRole.name;
      } else {
        // If the role is not found
        return 'Role not found';
      }
    } else {
      // If the user is not found
      return 'User not found';
    }
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
    throw new Error('Failed to fetch user role');
  }
};

export const extractUserFromToken = (req, res, next) => {
  // Get the token from the request headers, query params, or cookies
  const token = req.headers['authorization']?.split(' ')[1]; // assuming token is in 'Authorization' header

  if (token) {
    try {
      // Verify and decode the token to extract user information
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use your JWT secret here

      // Attach user data to the request object for use in subsequent middleware or routes
      req.user = decoded.user; // Assuming user data is stored in 'user' field of the token
    } catch (error) {
      // Handle token verification or decoding errors (e.g., expired or invalid token)
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  next(); // Move to the next middleware or route handler
};
export const validateAndCorrectPhoneNumber = (phoneNumber) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the number starts with '0' and replace it with '254'
  if (cleanedNumber.startsWith('0')) {
    const correctedNumber = `254${cleanedNumber.slice(1)}`;
    if (/^254\d{9}$/.test(correctedNumber)) {
      return correctedNumber;
    } else {
      return null;
    }
  }

  // Check if the number starts with '+254' and remove the '+'
  if (cleanedNumber.startsWith('+254')) {
    const correctedNumber = `254${cleanedNumber.slice(4)}`;
    if (/^254\d{9}$/.test(correctedNumber)) {
      return correctedNumber;
    } else {
      return null;
    }
  }

  // Check if the number starts with '254' and is of the correct length
  if (cleanedNumber.startsWith('254') && cleanedNumber.length === 12) {
    if (/^254\d{9}$/.test(cleanedNumber)) {
      return cleanedNumber;
    } else {
      return null;
    }
  }

  // Check if the number is a valid 9-digit number and append '254'
  if (cleanedNumber.length === 9) {
    const correctedNumber = `254${cleanedNumber}`;
    if (/^254\d{9}$/.test(correctedNumber)) {
      return correctedNumber;
    } else {
      return null;
    }
  }
  return null;
};

export const generateOTP = () => {
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  return newOtp;
};

export const formatDateTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleString('en-US', { timeZone: 'UTC' });
};
