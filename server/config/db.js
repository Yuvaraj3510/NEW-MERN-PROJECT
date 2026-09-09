const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/districtpulse_db';
  const fallbackUri = 'mongodb://127.0.0.1:27017/districtpulse_db';

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`====================================================`);
    console.log(` ✅ MongoDB Connected to Compass: ${conn.connection.host}`);
    console.log(` 📂 Compass Database: ${conn.connection.name}`);
    console.log(`====================================================`);
    return true;
  } catch (error) {
    try {
      const conn = await mongoose.connect(fallbackUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`====================================================`);
      console.log(` ✅ MongoDB Connected to Compass (127.0.0.1): ${conn.connection.host}`);
      console.log(` 📂 Compass Database: ${conn.connection.name}`);
      console.log(`====================================================`);
      return true;
    } catch (err2) {
      console.warn(`[MongoDB Notice] Connection failed to ${primaryUri}: ${error.message}`);
      return false;
    }
  }
};

const getIsConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('[MongoDB Event] Active Connection to localhost:27017 established.');
});

mongoose.connection.on('error', (err) => {
  console.warn('[MongoDB Event] Connection error:', err.message);
});

module.exports = { connectDB, getIsConnected };
