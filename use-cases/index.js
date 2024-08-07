import {
  subscriptionDb,
} from '../data-access/index.js';
import makeDashboardUseCase from './dashboard.js';
import makeSubscriptionUseCase from './subscriptions.js';

const makeDashboard = makeDashboardUseCase();
const makeSubscriptions = makeSubscriptionUseCase({ subscriptionDb });

const DashboardIndexUseCase = makeDashboard.index;

const getAllSubscriptionUseCase = makeSubscriptions.getAllSubscriptions;
const createSubscriptionUseCase = makeSubscriptions.createSubscription;
const updateSubscriptionUseCase = makeSubscriptions.updateSubscription;
const getSubscriptionByIdUseCase = makeSubscriptions.getSubscriptionById;
const deletedSubscriptionUseCase = makeSubscriptions.deleteSubscription;

export {
  DashboardIndexUseCase,
  getAllSubscriptionUseCase,
  createSubscriptionUseCase,
  getSubscriptionByIdUseCase,
  deletedSubscriptionUseCase,
  updateSubscriptionUseCase,
};
