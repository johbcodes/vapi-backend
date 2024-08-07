import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { sendErrorResponse } from '../utils/sendResponse.js';

const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendErrorResponse(res, 401, 'Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded; 
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', { error: error.message, stack: error.stack });
      return sendErrorResponse(res, 401, 'Token expired, please log in again');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('Malformed token:', { error: error.message, stack: error.stack });
      return sendErrorResponse(res, 401, 'Unauthorized malformed Token');
    } else {
      console.error('Error:', { error: error.message, stack: error.stack });
      return sendErrorResponse(res, 403, 'Unauthorized access');
    }
  }
});

export { authenticateToken };
