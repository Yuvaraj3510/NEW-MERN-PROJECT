const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id: id.toString() },
    process.env.JWT_SECRET || 'districtpulse_super_secret_jwt_key_2026_modern_mern',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, districtPreference } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check MongoDB or Memory Store for duplicate
    if (getIsConnected()) {
      try {
        const userExists = await User.findOne({ email: cleanEmail });
        if (userExists) {
          return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const user = await User.create({
          name: name.trim(),
          email: cleanEmail,
          password: password,
          role: role === 'admin' || role === 'organizer' ? role : 'user',
          districtPreference: districtPreference || 'Downtown Arts District',
        });

        console.log(`[DistrictPulse] 👤 New User Registered into MongoDB Compass: ${cleanEmail}`);

        const token = generateToken(user._id);

        return res.status(201).json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            districtPreference: user.districtPreference,
            wishlist: user.wishlist || [],
          },
          token,
        });
      } catch (mongoError) {
        if (mongoError.code === 11000) {
          return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }
        console.warn('MongoDB direct register write note:', mongoError.message);
      }
    }

    // Memory Store Fallback
    const users = global.__IN_MEMORY_DB__?.users || [];
    const userExists = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newId = '6610a' + Date.now().toString(16).padEnd(19, '0').slice(0, 19);

    const newUser = {
      _id: newId,
      id: newId,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role === 'admin' || role === 'organizer' ? role : 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      districtPreference: districtPreference || 'Downtown Arts District',
      wishlist: [],
      createdAt: new Date(),
    };

    users.push(newUser);

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        districtPreference: newUser.districtPreference,
        wishlist: newUser.wishlist,
      },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server registration error' });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = null;
    let isMatch = false;

    if (getIsConnected()) {
      try {
        user = await User.findOne({ email: cleanEmail });
        if (user) {
          isMatch = await user.matchPassword(password);
        }
      } catch (err) {
        console.warn('Mongo user lookup note:', err.message);
      }
    }

    if (!user && global.__IN_MEMORY_DB__?.users) {
      user = global.__IN_MEMORY_DB__.users.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id || user.id);

    res.json({
      success: true,
      user: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        districtPreference: user.districtPreference,
        wishlist: user.wishlist || [],
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server login error' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle wishlist for an event
// @route   POST /api/auth/wishlist/:eventId
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = (req.user._id || req.user.id).toString();

    if (getIsConnected()) {
      try {
        const user = await User.findById(userId);
        if (user) {
          user.wishlist = user.wishlist || [];
          const index = user.wishlist.indexOf(eventId);
          if (index > -1) {
            user.wishlist.splice(index, 1);
          } else {
            user.wishlist.push(eventId);
          }
          await user.save();
          return res.json({ success: true, wishlist: user.wishlist });
        }
      } catch (err) {
        // Fallback
      }
    }

    const user = (global.__IN_MEMORY_DB__?.users || []).find((u) => (u._id || u.id).toString() === userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.wishlist = user.wishlist || [];
    const index = user.wishlist.indexOf(eventId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(eventId);
    }
    return res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  toggleWishlist,
};
