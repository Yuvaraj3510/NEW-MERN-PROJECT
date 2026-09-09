const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'districtpulse_super_secret_jwt_key_2026_modern_mern'
      );

      // Check Mongoose or fallback
      let user = null;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Fallback store access
        if (global.__IN_MEMORY_DB__ && global.__IN_MEMORY_DB__.users) {
          user = global.__IN_MEMORY_DB__.users.find((u) => u._id === decoded.id || u.id === decoded.id);
        }
      }

      if (!user && global.__IN_MEMORY_DB__ && global.__IN_MEMORY_DB__.users) {
        user = global.__IN_MEMORY_DB__.users.find((u) => u._id === decoded.id || u.id === decoded.id);
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found or token expired' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth protect error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'guest'}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
