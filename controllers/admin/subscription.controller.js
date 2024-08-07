import {
  createSubscriptionUseCase,
  deletedSubscriptionUseCase,
  getAllSubscriptionUseCase,
  getSubscriptionByIdUseCase,
  updateSubscriptionUseCase,
} from '../../use-cases/index.js';

export default Object.freeze({
  createSubscription: (httpRequest) => createSubscriptionUseCase(httpRequest),
  getAllSubscriptions: (httpRequest) => getAllSubscriptionUseCase(httpRequest),
  updateSubscription: (httpRequest) => updateSubscriptionUseCase(httpRequest),
  getSubscriptionById: (httpRequest) => getSubscriptionByIdUseCase(httpRequest),
  deletedSubscription: (httpRequest) => deletedSubscriptionUseCase(httpRequest),
});
