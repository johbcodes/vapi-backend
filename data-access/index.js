import * as models from '../models/index.js';
import makePermissionDb from './permission.db.js';
import makeRoleDb from './role.db.js';
import makeUserDb from './user.db.js';
import makePlanDb from './plan.db.js';
import makeSubscriptionDb from './subscription.db.js';
import makeAssistantDb from './assistant.db.js';

const usersDb = makeUserDb(models);
const permissionDb = makePermissionDb(models);
const roleDb = makeRoleDb(models);
const planDb = makePlanDb(models);
const subscriptionDb = makeSubscriptionDb(models);
const assistantDb = makeAssistantDb(models);

export {
  usersDb,
  planDb,
  permissionDb,
  roleDb,
  subscriptionDb,
  assistantDb
};
