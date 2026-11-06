// Connects /api/auth URLs to controller functions. Only /me requires an existing login session.
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const recoveryRateLimit = require('../middleware/recoveryRateLimit');
const protect = require('../middleware/authMiddleware');

router.post('/forgot-password', recoveryRateLimit, authController.forgotPassword);
router.post('/reset-password', recoveryRateLimit, authController.resetPassword);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;