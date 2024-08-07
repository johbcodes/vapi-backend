import {
  createSubscriptionUseCase,
  getAllSubscriptionsUseCase,
  getSubscriptionByIdUseCase,
  updateSubscriptionUseCase,
  deleteSubscriptionUseCase,
} from '../../use-cases/subscription.js';

export default Object.freeze({
  createSubscription: (httpRequest) => createSubscriptionUseCase(httpRequest),
  getAllSubscriptions: (httpRequest) => getAllSubscriptionsUseCase(httpRequest),
  getSubscriptionById: (httpRequest) => getSubscriptionByIdUseCase(httpRequest),
  updateSubscription: (httpRequest) => updateSubscriptionUseCase(httpRequest),
  deleteSubscription: (httpRequest) => deleteSubscriptionUseCase(httpRequest),
});
