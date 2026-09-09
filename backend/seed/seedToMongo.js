const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('../config/db');
const { seedMongoDB } = require('./seedData');

dotenv.config({ path: '../.env' });
if (!process.env.MONGODB_URI) {
  dotenv.config();
}

async function runSeed() {
  console.log('🚀 Connecting to MongoDB to write collections...');
  const connected = await connectDB();
  if (connected) {
    await seedMongoDB();
    console.log('🎉 All users, events, and bookings have been written to MongoDB Compass database: "districtpulse_db"');
  } else {
    console.error('❌ Could not connect to MongoDB. Please ensure MongoDB Compass / mongod service is running.');
  }
  process.exit(0);
}

runSeed();
