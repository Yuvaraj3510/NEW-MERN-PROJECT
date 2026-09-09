const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    tierName: {
      type: String,
      required: true,
    },
    tierPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    attendeeInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    qrCodeDataUrl: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'refunded'],
      default: 'paid',
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'checked-in', 'cancelled'],
      default: 'confirmed',
    },
    checkInTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
