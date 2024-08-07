import { logError } from '../../config/logger.js';

export default function makePermissionsUseCase({ permissionDb }) {
  async function createPermission(req) {
    try {
      const { name } = req.body;
      const permissionExists = await permissionDb.findOne({
        name: name,
      });

      if (permissionExists) {
        return {
          statusCode: 203,
          body: {
            permission: name,
          },
          message: 'Permission insert failed permission already exists',
        };
      }

      const permission = await permissionDb.insert({ name });

      return {
        statusCode: 201,
        body: permission,
        message: 'Permission created Successfully',
      };
    } catch (error) {
      console.error('Error creating permissions:: ', error);
      logError.error('Error creating permission:: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Internal Server Error',
      };
    }
  }

  async function getPermissions() {
    try {
      const permissions = await permissionDb.find();

      return {
        statusCode: 200,
        body: permissions,
        message: 'Permissions fetched successfully',
      };
    } catch (error) {
      console.error('Error occurred fetching permissions: ', error);
      logError.error('Error occurred fetching permissions: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: { error },
        message: 'Error occurred fetching permissions',
      };
    }
  }

  async function getPermissionById(req) {
    try {
      const permission = await permissionDb.findOne({
        _id: req.params.id,
      });

      if (!permission) {
        return {
          statusCode: 404,
          body: permission,
          message: 'Permission not found',
        };
      }

      return {
        statusCode: 200,
        body: permission,
        message: 'Permission fetched permission successfully',
      };
    } catch (error) {
      console.error('Error getting permission: ', error);
      logError.error('Error getting permission: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Internal Server Error',
      };
    }
  }

  async function updatePermission(req) {
    try {
      const permission = await permissionDb.update(
        { _id: req.params.id },
        { name: req.body.name }
      );

      if (!permission) {
        return {
          statusCode: 404,
          body: {},
          message: 'Permission not found',
        };
      }

      return {
        statusCode: 200,
        body: permission,
        message: 'Permission updated successfully',
      };
    } catch (error) {
      console.error('Error updating permission: ', error);
      logError.error('Error updating permission: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Internal Server Error',
      };
    }
  }

  async function deletePermission(req) {
    try {
      const permission = await permissionDb.destroy({
        _id: req.params.id,
      });

      if (!permission) {
        return {
          statusCode: 404,
          body: permission,
          message: 'Permission not found',
        };
      }

      return {
        statusCode: 200,
        body: permission,
        message: 'Permission deleted',
      };
    } catch (error) {
      console.error('Error deleting permission: ', error);
      logError.error('Error deleting permission: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Internal Server Error',
      };
    }
  }

  return Object.freeze({
    createPermission,
    getPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
  });
}
