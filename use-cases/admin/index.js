import makeRolesUseCase from './roles.js';
import makePermissionsUseCase from './permissions.js';
import { roleDb, permissionDb, usersDb, planDb } from '../../data-access/index.js';
import makeUserManagementUseCase from './users.js';
import makePlanUseCase from './plans.js';

const makeRoles = makeRolesUseCase({ roleDb });
const makePermissions = makePermissionsUseCase({ permissionDb }); // Create permissions use cases
const makeUserManagement = makeUserManagementUseCase({ usersDb, roleDb, permissionDb });
const makePlanManagement = makePlanUseCase({ planDb });

const createRoleUseCase = makeRoles.createRole;
const getRolesByIdUseCase = makeRoles.getRoleById;
const getRolesUseCase = makeRoles.getRoles;
const deleteRoleUseCase = makeRoles.deleteRole;
const addPermissionsToRoleUseCase = makeRoles.addPermissionsToRole;
const updateRoleUseCase = makeRoles.updateRole;

const createPermissionUseCase = makePermissions.createPermission; // Export permissions use cases
const getPermissionByIdUseCase = makePermissions.getPermissionById;
const getPermissionUseCase = makePermissions.getPermissions;
const deletePermissionUseCase = makePermissions.deletePermission;
const updatePermissionUseCase = makePermissions.updatePermission;

const assignRolesToUserUseCase = makeUserManagement.assignRolesToUser;
const giveDirectPermissionToUserUseCase = makeUserManagement.giveDirectPermissionToUser;
const getUsersUseCase = makeUserManagement.getUsers;
const getUserByIdUseCase = makeUserManagement.getUserById;
const deleteUserUseCase = makeUserManagement.deleteUser;
const createUserUseCase = makeUserManagement.createUser;
const updateUserUseCase = makeUserManagement.updateUser;

const getAllPlansUseCase = makePlanManagement.getAllPlans;
const createPlanUseCase = makePlanManagement.createPlan;
const getPlanByIdUseCase = makePlanManagement.getPlanById;
const updatePlanUseCase = makePlanManagement.updatePlan;
const deletePlanUseCase = makePlanManagement.deletePlan;

export {
  // Roles
  createRoleUseCase,
  getRolesByIdUseCase,
  getRolesUseCase,
  deleteRoleUseCase,
  updateRoleUseCase,
  addPermissionsToRoleUseCase,

  // Permissions
  createPermissionUseCase,
  getPermissionByIdUseCase,
  getPermissionUseCase,
  deletePermissionUseCase,
  updatePermissionUseCase,

  // Users
  assignRolesToUserUseCase,
  giveDirectPermissionToUserUseCase,
  getUsersUseCase,
  getUserByIdUseCase,
  deleteUserUseCase,
  createUserUseCase,
  updateUserUseCase,

  // Plans
  getAllPlansUseCase,
  getPlanByIdUseCase,
  createPlanUseCase,
  updatePlanUseCase,
  deletePlanUseCase,
};
