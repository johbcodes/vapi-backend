import makeLoginUseCase from './login.js';
import makeRegisterUseCase from './register.js';
import { usersDb } from '../../data-access/index.js';

const makeAuth = makeLoginUseCase({ usersDb });
const makeRegistration = makeRegisterUseCase({ usersDb });

const loginUseCase = makeAuth.login;
const tokenRefreshUseCase = makeAuth.tokenRefresh;
const forgotPasswordUseCase = makeAuth.forgotPassword;
const resetPasswordUseCase = makeAuth.resetPassword;

const registerUserUseCase = makeRegistration.registerUser;

export {
  loginUseCase,
  tokenRefreshUseCase,
  registerUserUseCase,
  forgotPasswordUseCase,
  resetPasswordUseCase,
};
