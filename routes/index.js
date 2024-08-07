import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { sendErrorResponse } from '../utils/sendResponse.js';
import adminRoutes from './admin.routes.js';
import authRoutes from './auth.routes.js';
import guestRoutes from './guest.routes.js';
import authenticatedRoutes from './authenticated.routes.js';

const router = express.Router();

// Guest Routes
router.get('/', (req, res) => {
  return res.status(200).json('Vapi api/v1');
});

router.use('/', guestRoutes);
router.use('/auth', authRoutes);

// Authenticated Routes
router.use(authenticateToken);
router.use('/users', authenticatedRoutes);
router.use('/admin', adminRoutes);

router.all('*', (req, res) => sendErrorResponse(res, 404, 'Route does not exist'));

export default router;
