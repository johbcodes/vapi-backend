import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import makeExpressCallback from '../utils/makeExpressCallback.js';

const router = Router();

router.get('/dashboard/:filter?', makeExpressCallback(dashboardController.index));

export default router;
