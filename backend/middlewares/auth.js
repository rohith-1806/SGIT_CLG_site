const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User account no longer exists' });
    }

    if (req.user.isBlocked) {
      return res.status(403).json({ success: false, error: 'Your account has been suspended by administration' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token validation failed or expired' });
  }
};

module.exports = { protect };
