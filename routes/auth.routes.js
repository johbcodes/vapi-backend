import { Router } from 'express';
const router = Router();

import authController from '../controllers/auth.controller.js';
import makeExpressCallback from '../utils/makeExpressCallback.js';

// Register Route
router.post('/register', makeExpressCallback(authController.registerUser));

// Login Route
router.post('/login', makeExpressCallback(authController.login));

// Forgot Password Route
router.post('/forgot-password', makeExpressCallback(authController.forgotPassword));

// Reset Password Route
router.post('/reset-password', makeExpressCallback(authController.resetPassword));

// Refresh Token Route
router.post('/refresh-token', makeExpressCallback(authController.tokenRefresh));

export default router;
