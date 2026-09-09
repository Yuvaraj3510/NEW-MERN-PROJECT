const mongoose = require('mongoose');

const ticketTierSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'General Admission', 'VIP Pass', 'Early Bird'
  price: { type: Number, required: true },
  description: { type: String },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  perks: [{ type: String }],
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an event title'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add event description'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Music & Concerts', 'Tech & Innovation', 'Nightlife & Clubs', 'Arts & Theatre', 'Food & Culinary', 'Sports & Fitness', 'District Festivals', 'Workshops'],
      default: 'Music & Concerts',
    },
    district: {
      type: String,
      required: true,
      enum: ['Downtown Arts District', 'Silicon Tech Bay', 'Marina Waterfront', 'Historic Cultural Quarter', 'Midtown Arena & Square', 'Uptown Heights', 'Riverside Parkside'],
      default: 'Downtown Arts District',
    },
    venue: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, default: 'Metro City' },
      coordinates: {
        lat: { type: Number, default: 37.7749 },
        lng: { type: Number, default: -122.4194 },
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    doorsOpen: {
      type: String,
      default: '18:00',
    },
    bannerImage: {
      type: String,
      required: true,
      default: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
    },
    galleryImages: [{ type: String }],
    organizer: {
      name: { type: String, default: 'District Pulse Productions' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      contactEmail: { type: String, default: 'organizer@districtpulse.io' },
      verified: { type: Boolean, default: true },
    },
    ticketTiers: [ticketTierSchema],
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'sold-out', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 24,
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
