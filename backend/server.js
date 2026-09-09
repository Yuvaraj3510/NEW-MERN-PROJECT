const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { initializeMemoryStore, seedMongoDB } = require('./seed/seedData');
const { errorHandler } = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment config
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB and Seed Data
(async () => {
  await initializeMemoryStore();
  const connected = await connectDB();
  if (connected) {
    await seedMongoDB();
  }
})();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'DistrictPulse Event Management API',
    timestamp: new Date(),
    version: '1.0.0',
    mode: process.env.NODE_ENV || 'development',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` ⚡ DistrictPulse MERN Server Running on Port ${PORT}`);
  console.log(` 🌐 API Health: http://localhost:${PORT}/api/health`);
  console.log(` 🎟️ Events API: http://localhost:${PORT}/api/events`);
  console.log(`====================================================`);
});
