import { logError } from '../../config/logger.js';

export default function makeUserManagementUseCase({ usersDb, roleDb, permissionDb }) {
  async function assignRolesToUser(req) {
    const { userId, roleId } = req.body;
    try {
      const user = await usersDb.findOne({ _id: userId });
      const roles = await roleDb.findOne({ _id: roleId });

      if (!user || !roles) {
        return {
          statusCode: 404,
          body: {},
          message: 'User or Role not found',
        };
      }

      await usersDb.update({ roles: roleId });

      return {
        statusCode: 201,
        body: {},
        message: 'Role assigned successfully',
      };
    } catch (error) {
      console.error('Error Occurred Assigning Role to User: ', error);
      logError.error('Error Occurred Assigning Role to User: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Error Occurred Assigning Role to User',
      };
    }
  }

  async function giveDirectPermissionToUser(req) {
    const { userId, permissionIds } = req.body;

    try {
      const user = await usersDb.findOne({ _id: userId });

      if (!user) {
        return {
          statusCode: 404,
          body: {},
          message: 'User not found',
        };
      }

      const permissions = await permissionDb.findPermissionsByIds(permissionIds);

      if (permissions.length !== permissionIds.length) {
        return {
          statusCode: 404,
          body: {},
          message: 'Some permissions not found',
        };
      }

      await usersDb.update({ _id: userId }, { permissions: permissionIds });

      return {
        statusCode: '200',
        body: {},
        message: 'Permissions assigned successfully',
      };
    } catch (error) {
      console.error('Error occurred assigning permissions: ', error);
      logError.error('Error occurred assigning permissions: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Error occurred assigning permissions',
      };
    }
  }

  async function getUsers() {
    try {
      const users = await usersDb.find();

      return {
        statusCode: 200,
        body: { users: users },
        message: 'Users fetched successfully',
      };
    } catch (error) {
      console.error('Error occurred fetching users: ', error);
      logError.error('Error occurred fetching users: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: { error },
        message: 'Error occurred fetching users',
      };
    }
  }
  async function createUser(req) {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role_name,
    } = req.body;

    try {
      const userExists = await usersDb.findOne({ email });
      if (userExists) {
        return {
          statusCode: 401,
          body: {},
          message: 'User Already Exists',
        };
      }

      const role = await roleDb.findOne({ name: role_name });

      const newUser = await usersDb.insert({
        username,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        roles: role._id,
      });

      const sanitizedUser = {
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      };

      return {
        statusCode: 200,
        body: {
          user: sanitizedUser,
        },
        message: 'User created successfully',
      };
    } catch (error) {
      console.error('Error occurred creating users: ', error);
      logError.error('Error occurred creating users: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Server error occurred',
      };
    }
  }

  async function getUserById(req) {
    try {
      const user = await usersDb.find({ _id: req.params.id });

      if (!user) {
        return {
          statusCode: 404,
          body: {},
          message: 'User not found',
        };
      }

      return {
        statusCode: 200,
        body: { user },
        message: 'User fetched successfully',
      };
    } catch (error) {
      console.error('Error occurred fetching users: ', error);
      logError.error('Error occurred fetching users: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Server error occurred',
      };
    }
  }
  async function updateUser(req) {
    const { firstName, lastName, email, password, phoneNumber, role_name } =
      req.body;

    try {
      const userExists = await usersDb.findOne({ _id: req.params.id });
      if (!userExists) {
        return {
          statusCode: 404,
          body: {},
          message: 'User not found',
        };
      }

      const role = await roleDb.findOne({ name: role_name });

      const updatedUser = await usersDb.update(
        { _id: userExists },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          roles: role._id,
        }
      );

      const sanitizedUser = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      };

      return {
        statusCode: 200,
        body: {
          user: sanitizedUser,
        },
        message: 'User updated successfully',
      };
    } catch (error) {
      console.error('Error occurred updating users: ', error);
      logError.error('Error occurred updating users: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Server error occurred',
      };
    }
  }

  async function deleteUser(req) {
    try {
      const user = await usersDb.find({ _id: req.params.id });

      if (!user) {
        return {
          statusCode: 404,
          body: {},
          message: 'User not found',
        };
      }
      const deleted = await usersDb.destroy({ _id: req.params.id });

      return {
        statusCode: 200,
        body: { deleted },
        message: 'User delete successfully',
      };
    } catch (error) {
      console.error('Error occurred deleting users: ', error);
      logError.error('Error occurred deleting users: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Error occurred deleting user',
      };
    }
  }

  return Object.freeze({
    assignRolesToUser,
    giveDirectPermissionToUser,
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser,
  });
}
