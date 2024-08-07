import {
  addPermissionsToRoleUseCase,
  createRoleUseCase,
  deleteRoleUseCase,
  getRolesByIdUseCase,
  getRolesUseCase,
  updateRoleUseCase,
} from '../../use-cases/admin/index.js';
export default Object.freeze({
  createRole: (httpRequest) => createRoleUseCase(httpRequest),
  getRoles: (httpRequest) => getRolesUseCase(httpRequest),
  getRoleById: (httpRequest) => getRolesByIdUseCase(httpRequest),
  updateRole: (httpRequest) => updateRoleUseCase(httpRequest),
  deleteRole: (httpRequest) => deleteRoleUseCase(httpRequest),
  addPermissionsToRole: (httpRequest) => addPermissionsToRoleUseCase(httpRequest),
});
