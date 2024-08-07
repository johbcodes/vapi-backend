import {
  createPermissionUseCase,
  deletePermissionUseCase,
  getPermissionByIdUseCase,
  getPermissionUseCase,
  updatePermissionUseCase,
} from '../../use-cases/admin/index.js';

export default Object.freeze({
  createPermission: (httpRequest) => createPermissionUseCase(httpRequest),
  getPermissions: (httpRequest) => getPermissionUseCase(httpRequest),
  getPermissionById: (httpRequest) => getPermissionByIdUseCase(httpRequest),
  updatePermission: (httpRequest) => updatePermissionUseCase(httpRequest),
  deletePermission: (httpRequest) => deletePermissionUseCase(httpRequest),
});
