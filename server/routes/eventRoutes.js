const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getDistrictsMeta,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.get('/meta/districts', getDistrictsMeta);
router.get('/:id', getEventById);
router.post('/', protect, authorize('admin', 'organizer'), createEvent);
router.put('/:id', protect, authorize('admin', 'organizer'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

module.exports = router;
