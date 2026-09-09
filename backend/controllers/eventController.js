const Event = require('../models/Event');
const { getIsConnected } = require('../config/db');

// Helper to sanitize slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// @desc    Get all events with filters (district, category, search, sort, price)
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const { district, category, search, minPrice, maxPrice, featured, sort } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (district && district !== 'All Districts') {
        query.district = district;
      }
      if (category && category !== 'All Categories') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'venue.name': { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      let sortOptions = { startDate: 1 };
      if (sort === 'price_asc') sortOptions = { 'ticketTiers.price': 1 };
      if (sort === 'price_desc') sortOptions = { 'ticketTiers.price': -1 };
      if (sort === 'rating') sortOptions = { rating: -1 };
      if (sort === 'newest') sortOptions = { createdAt: -1 };

      let events = await Event.find(query).sort(sortOptions);
      return res.json({ success: true, count: events.length, data: events });
    } else {
      // In-Memory Fallback Filter
      let events = [...(global.__IN_MEMORY_DB__?.events || [])];

      if (district && district !== 'All Districts') {
        events = events.filter((e) => e.district.toLowerCase() === district.toLowerCase());
      }
      if (category && category !== 'All Categories') {
        events = events.filter((e) => e.category.toLowerCase() === category.toLowerCase());
      }
      if (featured === 'true') {
        events = events.filter((e) => e.featured === true);
      }
      if (search) {
        const s = search.toLowerCase();
        events = events.filter(
          (e) =>
            e.title.toLowerCase().includes(s) ||
            e.description.toLowerCase().includes(s) ||
            (e.venue && e.venue.name && e.venue.name.toLowerCase().includes(s)) ||
            (e.tags && e.tags.some((t) => t.toLowerCase().includes(s)))
        );
      }

      if (minPrice) {
        events = events.filter((e) =>
          e.ticketTiers.some((t) => t.price >= Number(minPrice))
        );
      }
      if (maxPrice) {
        events = events.filter((e) =>
          e.ticketTiers.some((t) => t.price <= Number(maxPrice))
        );
      }

      // Sort
      if (sort === 'price_asc') {
        events.sort((a, b) => (a.ticketTiers[0]?.price || 0) - (b.ticketTiers[0]?.price || 0));
      } else if (sort === 'price_desc') {
        events.sort((a, b) => (b.ticketTiers[0]?.price || 0) - (a.ticketTiers[0]?.price || 0));
      } else if (sort === 'rating') {
        events.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else {
        events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      }

      return res.json({ success: true, count: events.length, data: events });
    }
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event by ID or slug
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    let event = null;
    if (getIsConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        event = await Event.findById(id);
      } else {
        event = await Event.findOne({ slug: id });
      }
    }

    if (!event && global.__IN_MEMORY_DB__?.events) {
      event = global.__IN_MEMORY_DB__.events.find(
        (e) => (e._id || e.id) === id || e.slug === id
      );
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin / Organizer)
const createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    if (!eventData.title || !eventData.description || !eventData.district || !eventData.venue?.name) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory event fields' });
    }

    eventData.slug = slugify(eventData.title) + '-' + Date.now().toString().slice(-4);
    if (!eventData.organizer) {
      eventData.organizer = {
        name: req.user.name || 'District Organizer',
        avatar: req.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        contactEmail: req.user.email,
        verified: true,
      };
    }

    if (getIsConnected()) {
      const event = await Event.create(eventData);
      return res.status(201).json({ success: true, data: event });
    } else {
      const newId = '6620a' + Date.now().toString(16).padEnd(19, '0').slice(0, 19);
      const newEvent = {
        _id: newId,
        id: newId,
        ...eventData,
        rating: 5.0,
        reviewsCount: 1,
        createdAt: new Date(),
      };
      global.__IN_MEMORY_DB__.events.unshift(newEvent);
      return res.status(201).json({ success: true, data: newEvent });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Admin / Organizer)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      let event = await Event.findById(id);
      if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

      event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return res.json({ success: true, data: event });
    } else {
      const events = global.__IN_MEMORY_DB__.events;
      const index = events.findIndex((e) => (e._id || e.id) === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Event not found' });

      events[index] = { ...events[index], ...req.body, updatedAt: new Date() };
      return res.json({ success: true, data: events[index] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
      await event.deleteOne();
      return res.json({ success: true, message: 'Event deleted successfully' });
    } else {
      const events = global.__IN_MEMORY_DB__.events;
      const index = events.findIndex((e) => (e._id || e.id) === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Event not found' });

      events.splice(index, 1);
      return res.json({ success: true, message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get District summary metadata & Category list
// @route   GET /api/events/meta/districts
// @access  Public
const getDistrictsMeta = async (req, res) => {
  const districts = [
    {
      name: 'Bengaluru Tech & Silicon Corridor',
      tagline: 'Koramangala, Indiranagar & Palace Grounds',
      badge: 'Tech Hub',
      accentColor: '#06b6d4',
      icon: 'cpu',
    },
    {
      name: 'Mumbai Marine Drive & South Bombay',
      tagline: 'Worli NSCI Dome, Bandra & Sea Link',
      badge: 'Bollywood & Coastal',
      accentColor: '#6366f1',
      icon: 'sparkles',
    },
    {
      name: 'Delhi NCR & Heritage Cultural Quarter',
      tagline: 'Connaught Place, IHC & Chandni Chowk',
      badge: 'Heritage & Food',
      accentColor: '#f59e0b',
      icon: 'landmark',
    },
    {
      name: 'Goa Coastal & Beachside District',
      tagline: 'Vagator Sunburn, Anjuna & Morjim Beach',
      badge: 'Beach & EDM',
      accentColor: '#10b981',
      icon: 'anchor',
    },
    {
      name: 'Hyderabad Cyberabad & HITEC City',
      tagline: 'Gachibowli Stadium, Shilparamam & T-Hub',
      badge: 'Biryani & Esports',
      accentColor: '#ec4899',
      icon: 'zap',
    },
    {
      name: 'Jaipur & Rajasthan Heritage Quarter',
      tagline: 'Amber Fort, Diggi Palace JLF & Bazaars',
      badge: 'Royal Heritage',
      accentColor: '#8b5cf6',
      icon: 'trees',
    },
    {
      name: 'Kolkata Cultural & Park Street Quarter',
      tagline: 'Victoria Memorial, Nicco Park & Salt Lake',
      badge: 'Arts & Culture',
      accentColor: '#f43f5e',
      icon: 'sparkles',
    },
    {
      name: 'Chennai Coastal & Music Quarter',
      tagline: 'Marina Beach, Kalakshetra & ECR',
      badge: 'Classical & Coastal',
      accentColor: '#14b8a6',
      icon: 'anchor',
    },
  ];

  const categories = [
    'All Categories',
    'Music & Concerts',
    'Tech & Innovation',
    'Nightlife & Clubs',
    'Arts & Theatre',
    'Food & Culinary',
    'Sports & Fitness',
    'District Festivals',
    'Workshops',
  ];

  res.json({ success: true, districts, categories });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getDistrictsMeta,
};
