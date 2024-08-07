import {
  loginUseCase,
  tokenRefreshUseCase,
  registerUserUseCase,
  forgotPasswordUseCase,
  resetPasswordUseCase,
} from '../use-cases/auth/index.js';

export default Object.freeze({
  login: (httpRequest) => loginUseCase(httpRequest),
  tokenRefresh: (httpRequest) => tokenRefreshUseCase(httpRequest),
  forgotPassword: (httpRequest) => forgotPasswordUseCase(httpRequest),
  resetPassword: (httpRequest) => resetPasswordUseCase(httpRequest),

  registerUser: (httpRequest) => registerUserUseCase(httpRequest),
});
