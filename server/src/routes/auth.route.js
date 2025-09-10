import express from 'express';
const router = express.Router();

// Import controllers
import controllers from '../controllers/auth.controller.js';
import auth from '../middleware/auth.js';

// Auth Routes
router.post('/auth/register', controllers.register);
router.post('/auth/login', controllers.login);
router.post('/auth/forgot-password', controllers.forgotPassword);
router.post('/auth/reset-password', controllers.resetPassword);

// Protected example routes (for demonstration)
router.get('/user/profile', auth, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Health check
router.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// Make sure this exports correctly as an Express Router
export default router;