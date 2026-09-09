const QRCode = require('qrcode');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// Helper to generate QR code data URL safely
const generateQRCode = async (dataString) => {
  try {
    return await QRCode.toDataURL(dataString, {
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      width: 280,
      margin: 2,
    });
  } catch (err) {
    const encoded = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#0f172a"/><text x="50%" y="50%" fill="#6366f1" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="12">${dataString}</text></svg>`
    );
    return `data:image/svg+xml;utf8,${encoded}`;
  }
};

// @desc    Book event ticket(s)
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { eventId, tierName, quantity, attendeeInfo } = req.body;
    const userId = (req.user._id || req.user.id || '6610a1111111111111111102').toString();

    if (!eventId || !tierName || !quantity || !attendeeInfo?.fullName || !attendeeInfo?.email) {
      return res.status(400).json({ success: false, message: 'Missing required booking information' });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({ success: false, message: 'Invalid ticket quantity' });
    }

    let event = null;

    if (getIsConnected()) {
      try {
        if (eventId.match(/^[0-9a-fA-F]{24}$/)) {
          event = await Event.findById(eventId);
        }
      } catch (err) {
        // Continue to fallback check
      }

      // If not in Mongo yet, fetch from memory store and sync to MongoDB
      if (!event) {
        const memEvent = global.__IN_MEMORY_DB__?.events.find(
          (e) => (e._id || e.id) === eventId || e.slug === eventId
        );
        if (memEvent) {
          try {
            const { _id, id, ...eventDoc } = memEvent;
            event = await Event.create({ _id: memEvent._id, ...eventDoc });
          } catch (createErr) {
            event = await Event.findOne({ title: memEvent.title });
          }
        }
      }
    }

    // Memory Store Fallback
    if (!event && global.__IN_MEMORY_DB__?.events) {
      event = global.__IN_MEMORY_DB__.events.find((e) => (e._id || e.id) === eventId || e.slug === eventId);
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Find requested tier
    const tier = event.ticketTiers.find((t) => t.name.toLowerCase() === tierName.toLowerCase()) || event.ticketTiers[0];
    if (!tier) {
      return res.status(400).json({ success: false, message: `Ticket tier '${tierName}' not available` });
    }

    if (tier.availableSeats < qty) {
      return res.status(400).json({
        success: false,
        message: `Only ${tier.availableSeats} tickets remaining in ${tier.name}`,
      });
    }

    // Compute pricing
    const tierPrice = tier.price;
    const subtotal = tierPrice * qty;
    const serviceFee = Math.round(subtotal * 0.05 * 100) / 100;
    const totalAmount = subtotal + serviceFee;

    // Generate unique reference
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `DP-2026-${randomCode}`;

    // Generate QR Code containing verification payload
    const qrPayload = JSON.stringify({
      ref: bookingReference,
      event: event.title,
      tier: tier.name,
      qty,
      attendee: attendeeInfo.fullName,
      verified: true,
      timestamp: new Date().toISOString(),
    });

    const qrCodeDataUrl = await generateQRCode(qrPayload);

    // Decrement available seats
    tier.availableSeats -= qty;

    if (getIsConnected()) {
      try {
        if (typeof event.save === 'function') {
          await event.save();
        }

        // Ensure user exists in MongoDB
        let mongoUser = await User.findById(userId);
        if (!mongoUser) {
          mongoUser = await User.create({
            _id: userId,
            name: attendeeInfo.fullName || req.user.name || 'Explorer User',
            email: attendeeInfo.email || req.user.email || `user-${Date.now()}@districtpulse.io`,
            password: '$2a$10$wE99Y5HqG83NnE8dJkJ4k.v6G8Kx/L3k9j8mH1L0K2.',
            role: 'user',
          });
        }

        const booking = await Booking.create({
          bookingReference,
          user: mongoUser._id,
          event: event._id,
          tierName: tier.name,
          tierPrice,
          quantity: qty,
          subtotal,
          serviceFee,
          totalAmount,
          attendeeInfo,
          qrCodeDataUrl,
          paymentStatus: 'paid',
          bookingStatus: 'confirmed',
        });

        console.log(`[DistrictPulse] 🎟️ Booking Saved to MongoDB Compass! Reference: ${bookingReference}`);

        const populatedBooking = await Booking.findById(booking._id).populate('event');
        return res.status(201).json({ success: true, data: populatedBooking || booking });
      } catch (mongoErr) {
        console.warn('MongoDB direct booking write note:', mongoErr.message);
      }
    }

    // In-memory record
    const newBookingId = '6630a' + Date.now().toString(16).padEnd(19, '0').slice(0, 19);
    const newBooking = {
      _id: newBookingId,
      id: newBookingId,
      bookingReference,
      user: userId,
      event: event,
      tierName: tier.name,
      tierPrice,
      quantity: qty,
      subtotal,
      serviceFee,
      totalAmount,
      attendeeInfo,
      qrCodeDataUrl,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      createdAt: new Date(),
    };

    global.__IN_MEMORY_DB__.bookings.unshift(newBooking);
    return res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const userId = (req.user._id || req.user.id).toString();

    if (getIsConnected()) {
      const bookings = await Booking.find({ user: userId })
        .populate('event')
        .sort({ createdAt: -1 });
      if (bookings.length > 0) {
        return res.json({ success: true, count: bookings.length, data: bookings });
      }
    }

    const userBookings = (global.__IN_MEMORY_DB__?.bookings || []).filter(
      (b) => (b.user?._id || b.user || '').toString() === userId
    );

    const enriched = userBookings.map((b) => {
      if (typeof b.event === 'string') {
        const ev = global.__IN_MEMORY_DB__.events.find((e) => (e._id || e.id) === b.event);
        return { ...b, event: ev || b.event };
      }
      return b;
    });

    return res.json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get booking by reference code
// @route   GET /api/bookings/ref/:reference
// @access  Public / Private
const getBookingByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    let booking = null;
    if (getIsConnected()) {
      booking = await Booking.findOne({ bookingReference: reference }).populate('event');
    }

    if (!booking) {
      booking = global.__IN_MEMORY_DB__?.bookings.find(
        (b) => b.bookingReference.toLowerCase() === reference.toLowerCase()
      );
      if (booking && typeof booking.event === 'string') {
        booking.event = global.__IN_MEMORY_DB__.events.find((e) => (e._id || e.id) === booking.event);
      }
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reference not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req.user._id || req.user.id).toString();

    if (getIsConnected()) {
      const booking = await Booking.findById(id);
      if (booking) {
        booking.bookingStatus = 'cancelled';
        await booking.save();
        return res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
      }
    }

    const bookings = global.__IN_MEMORY_DB__?.bookings || [];
    const b = bookings.find((item) => (item._id || item.id) === id);
    if (!b) return res.status(404).json({ success: false, message: 'Booking not found' });

    b.bookingStatus = 'cancelled';
    return res.json({ success: true, message: 'Booking cancelled successfully', data: b });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingByReference,
  cancelBooking,
};
