const express = require('express');
const { 
  register, verifyOTP, login, adminLogin, superAdminLogin, 
  forgotPassword, resetPassword, getMe, updateProfile 
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/super-admin-login', superAdminLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);

module.exports = router;
