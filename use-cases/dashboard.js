import { logError } from '../config/logger.js';
import {
  usersDb,
} from '../data-access/index.js';
import { getUserRoleName } from '../utils/functions.js';

export default function makeDashboardUseCase() {
  async function index(req) {
    try {
      const userId = req.userData.id;
      const filter = parseInt(req.params.filter ? req.params.filter : 15);

      const user = await usersDb.findOne({ _id: userId });
      if (!user) {
        return {
          statusCode: 404,
          body: {},
          message: 'User not found',
        };
      }

      const roleName = await getUserRoleName(userId);
      let dashboard = null;

      if (roleName === 'Admin') {
      } else {
      }

      // Return response
      return {
        statusCode: 200,
        body: { dashboard },
        message: 'Dashboard data fetched successfully',
      };
    } catch (error) {
      // Handle errors
      console.error('Error fetching dashboard:', error);
      logError.error('Error fetching dashboard: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to fetch dashboard',
      };
    }
  }

  return {
    index,
  };
}
