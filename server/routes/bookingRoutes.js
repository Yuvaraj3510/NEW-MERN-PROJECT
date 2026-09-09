const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingByReference,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/ref/:reference', getBookingByReference);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
