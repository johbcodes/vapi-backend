import jwt from 'jsonwebtoken';
import { roleDb, usersDb } from '../data-access/index.js';
import { sendErrorResponse } from '../utils/sendResponse.js';
import { logError } from '../config/logger.js';

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return sendErrorResponse(res, 401, 'Unauthorized token not found');
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.id;
      const user = await usersDb.findOne({ _id: userId }, { populate: ['roles'] });

      if (!user || !user.roles || user.roles.length === 0) {
        return sendErrorResponse(res, 403, 'Unauthorized user token not found');
      }

      const role = await roleDb.findOne(
        { _id: user.roles._id },
        { populate: ['permissions'] }
      );

      if (!role) {
        return sendErrorResponse(res, 403, 'Unauthorized. User Role not found');
      }

      const hasPermission = role.permissions.some(
        (permission) => permission.name === requiredPermission
      );

      if (hasPermission) {
        return next();
      } else {
        return sendErrorResponse(
          res,
          403,
          'Forbidden. Not permitted to access resource'
        );
      }
    } catch (error) {
      console.error('Error:', { error: error.message, stack: error.stack });
      logError.error('Error:', { error: error.message, stack: error.stack });
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};

export default checkPermission;
