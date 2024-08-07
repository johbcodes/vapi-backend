import { Router } from 'express';
import roleController from '../controllers/admin/role.controller.js';
import permissionController from '../controllers/admin/permission.controller.js';
import userController from '../controllers/admin/user.controller.js';
import planController from '../controllers/admin/plan.controller.js';
import subscriptionController from '../controllers/admin/user.controller.js';
import makeExpressCallback from '../utils/makeExpressCallback.js';
import checkPermission from '../middleware/checkPermission.js';

const router = Router();

//Roles routes
router.post(
  '/roles',
  checkPermission('create-role'),
  makeExpressCallback(roleController.createRole)
);
router.get(
  '/roles',
  checkPermission('view-role'),
  makeExpressCallback(roleController.getRoles)
);
router.get(
  '/roles/:id',
  checkPermission('view-role'),
  makeExpressCallback(roleController.getRoleById)
);
router.put(
  '/roles/:id',
  checkPermission('edit-role'),

  makeExpressCallback(roleController.updateRole)
);
router.delete(
  '/roles/:id',
  checkPermission('delete-role'),
  makeExpressCallback(roleController.deleteRole)
);
router.post(
  '/roles/add-permissions',
  checkPermission('add-role-permission'),

  makeExpressCallback(roleController.addPermissionsToRole)
);

//Permissions routes
router.post(
  '/permissions',
  checkPermission('create-permission'),
  makeExpressCallback(permissionController.createPermission)
);
router.get(
  '/permissions',
  checkPermission('view-permission'),
  makeExpressCallback(permissionController.getPermissions)
);
router.get(
  '/permissions/:id',
  checkPermission('view-permission'),
  makeExpressCallback(permissionController.getPermissionById)
);
router.put(
  '/permissions/:id',
  checkPermission('edit-permission'),
  makeExpressCallback(permissionController.updatePermission)
);

router.delete(
  '/permissions/:id',
  checkPermission('delete-permission'),

  makeExpressCallback(permissionController.deletePermission)
);

//  User Routes
router.get(
  '/users',
  checkPermission('view-user'),
  makeExpressCallback(userController.getAllUsers)
);
router.post(
  '/users',
  checkPermission('create-user'),
  makeExpressCallback(userController.createUser)
);
router.get(
  '/users/:id',
  checkPermission('view-user'),
  makeExpressCallback(userController.getUserById)
);
router.put(
  '/users/:id',
  checkPermission('edit-user'),
  makeExpressCallback(userController.updateUser)
);
router.delete(
  '/users/:id',
  checkPermission('delete-user'),
  makeExpressCallback(userController.deleteUser)
);

router.post(
  '/users/assign-role',
  checkPermission('assign-user-role'),
  makeExpressCallback(userController.assignRolesToUser)
);

router.post(
  '/users/assign-direct-permissions',
  checkPermission('assign-user-direct-permission'),
  makeExpressCallback(userController.giveDirectPermissionToUser)
);

// Plans
router.post(
  '/plans',
  checkPermission('create-plan'),
  makeExpressCallback(planController.createPlan)
);

router.put(
  '/plans/:id',
  checkPermission('edit-plan'),
  makeExpressCallback(planController.updatePlan)
);
router.delete(
  '/plans/:id',
  checkPermission('delete-plan'),
  makeExpressCallback(planController.deletePlan)
);

//  Subscriptions
router.get(
  '/subscriptions',
  checkPermission('view-all-subscriptions'),
  makeExpressCallback(subscriptionController.getAllSubscriptions)
);
router.post(
  '/subscriptions',
  checkPermission('create-subscription'),
  makeExpressCallback(subscriptionController.createSubscription)
);
router.get(
  '/subscriptions/:id',
  checkPermission('view-subscription'),
  makeExpressCallback(subscriptionController.getSubscriptionById)
);
router.put(
  '/subscriptions/:id',
  checkPermission('edit-subscription'),
  makeExpressCallback(subscriptionController.updateSubscription)
);
router.delete(
  '/subscriptions/:id',
  checkPermission('delete-subscription'),
  makeExpressCallback(subscriptionController.deleteSubscription)
);

export default router;
