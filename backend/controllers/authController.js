const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { sendOTPEmail } = require('../utils/emailService');

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE
  });

  const userObj = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    avatar: user.avatar,
    enrollmentNo: user.enrollmentNo,
    phone: user.phone,
    bio: user.bio,
    skills: user.skills,
    socialLinks: user.socialLinks,
    isVerified: user.isVerified
  };

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user: userObj
  });
};

// @desc    Register Student Account
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, department, enrollmentNo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email address already registered at SGIT AUTONOMOUS' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await User.create({
      name,
      email,
      password,
      role: 'student',
      department: department || 'CSE',
      enrollmentNo: enrollmentNo || '',
      isVerified: false,
      otpCode,
      otpExpire
    });

    await sendOTPEmail(user.email, otpCode, 'Account Registration Verification');

    await AuditLog.create({
      actor: user.email,
      role: 'student',
      action: 'USER_REGISTER',
      details: `New student registration initiated for ${user.name}`
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Verification OTP sent to email.',
      email: user.email,
      requiresOTP: true
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User account not found' });
    }

    if (user.otpCode !== otpCode || !user.otpExpire || user.otpExpire < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP code' });
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpire = null;
    await user.save();

    await AuditLog.create({
      actor: user.email,
      role: user.role,
      action: 'OTP_VERIFIED',
      details: `Account verified successfully for ${user.email}`
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Student / General Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ success: false, error: 'Account suspended. Contact SGIT Administration.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    await AuditLog.create({
      actor: user.email,
      role: user.role,
      action: 'USER_LOGIN',
      details: `Sign in successful for ${user.name}`
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Hidden Admin Login
// @route   POST /api/auth/admin-login
// @access  Public (Hidden Route)
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Unauthorized Admin credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid Admin credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Hidden Super Admin Login
// @route   POST /api/auth/super-admin-login
// @access  Public (Hidden Route)
exports.superAdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || user.role !== 'superadmin') {
      return res.status(401).json({ success: false, error: 'Unauthorized Super Admin credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid Super Admin credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Send Reset Password OTP
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account found with this email' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTPEmail(user.email, otpCode, 'Password Reset Request');

    res.status(200).json({ success: true, message: 'Password reset OTP sent to email', email });
  } catch (err) {
    next(err);
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otpCode, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otpCode !== otpCode || !user.otpExpire || user.otpExpire < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.otpCode = null;
    user.otpExpire = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful! Please log in.' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get Me Profile
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
