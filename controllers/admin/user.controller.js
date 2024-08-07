import {
  createUserUseCase,
  deleteUserUseCase,
  getUserByIdUseCase,
  getUsersUseCase,
  updateUserUseCase,
} from '../../use-cases/admin/index.js';

export default Object.freeze({
  createUser: (httpRequest) => createUserUseCase(httpRequest),
  getAllUsers: (httpRequest) => getUsersUseCase(httpRequest),
  updateUser: (httpRequest) => updateUserUseCase(httpRequest),
  getUserById: (httpRequest) => getUserByIdUseCase(httpRequest),
  deleteUser: (httpRequest) => deleteUserUseCase(httpRequest),
});
