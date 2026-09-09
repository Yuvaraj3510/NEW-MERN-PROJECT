const express = require('express');
const router = express.Router();
const {
  getAdminAnalytics,
  getAllUsers,
  getAllBookings,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/analytics', protect, authorize('admin', 'organizer'), getAdminAnalytics);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/bookings', protect, authorize('admin', 'organizer'), getAllBookings);

module.exports = router;
