import { logError } from '../../config/logger.js';
import { permissionDb } from '../../data-access/index.js';
export default function makeRolesUseCase({ roleDb }) {
  async function createRole(req) {
    const { name } = req.body;
    const roleExists = await roleDb.findOne({ name: name });
    if (roleExists) {
      return {
        statusCode: 400,
        body: {
          role: name,
        },
        message: 'Role insert failed role exists',
      };
    }

    const role = await roleDb.insert({ name: name });

    return {
      statusCode: 201,
      body: role,
      message: 'Role created successfully',
    };
  }

  async function getRoles() {
    const roles = await roleDb.find({}, { populate: ['permissions'] });
    return {
      statusCode: 200,
      body: {
        roles,
      },
      message: 'Fetched roles successfully',
    };
  }

  async function getRoleById(req) {
    const role = await roleDb.findOne({ _id: req.params.id });

    if (!role) {
      return {
        statusCode: 404,
        body: {
          role: role,
        },
        message: 'Role Not found',
      };
    }

    return {
      statusCode: 200,
      body: {
        role: role,
      },
      message: 'Fetched roles successfully',
    };
  }

  async function updateRole(req) {
    const role = await roleDb.update({ _id: req.params.id }, { name: req.body.name });

    if (!role) {
      return {
        statusCode: 404,
        body: {
          role: role,
        },
        message: 'Role not found',
      };
    }

    return {
      statusCode: 200,
      body: {
        role: role,
      },
      message: 'Role updated successfully',
    };
  }

  async function deleteRole(req) {
    const role = await roleDb.destroy({ _id: req.params.id });

    if (!role) {
      return {
        statusCode: 404,
        body: {
          role: role,
        },
        message: 'Role not found',
      };
    }

    return {
      statusCode: 200,
      body: {
        role: role,
      },
      message: 'Role Delete Successfully',
    };
  }
  async function addPermissionsToRole(req) {
    let roleId = req.body.roleId;
    let permissionIds = req.body.permissions;

    try {
      const role = await roleDb.findOne({ _id: roleId });
      const permissions = await permissionDb.findPermissionsByIds(permissionIds);
      if (!role || permissions.length !== permissionIds.length) {
        return {
          statusCode: 500,
          body: {},
          response: 'Permission or user not found',
        };
      }

      role.permissions = permissionIds;
      await roleDb.update({ _id: roleId }, { permissions: permissionIds });
      return {
        statusCode: 200,
        body: {},
        response: {
          message: 'Permission assigned to role successfully',
        },
      };
    } catch (error) {
      console.error('Failed to assign permission to role: ', error);
      logError.error('Failed to assign permission to role: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        response: {
          error: 'Failed to assign permission to role',
        },
      };
    }
  }

  return Object.freeze({
    createRole,
    updateRole,
    getRoles,
    getRoleById,
    deleteRole,
    addPermissionsToRole,
  });
}
