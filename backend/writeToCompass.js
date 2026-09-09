const mongoose = require('mongoose');
const { seedUsers, seedEvents, seedBookings } = require('./seed/seedData');
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const bcrypt = require('bcryptjs');

const URI = 'mongodb://localhost:27017/districtpulse_db';

async function pushToCompass() {
  console.log(`📡 Connecting to MongoDB at ${URI}...`);
  try {
    await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ Connected successfully to database: "districtpulse_db"`);

    console.log(`🧹 Clearing old collections in districtpulse_db...`);
    await User.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});

    console.log(`👥 Inserting ${seedUsers.length} Users into "users" collection...`);
    const salt = await bcrypt.genSalt(10);
    const usersToInsert = await Promise.all(
      seedUsers.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.rawPassword, salt);
        return {
          _id: u._id,
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: u.role,
          avatar: u.avatar,
          districtPreference: u.districtPreference,
          wishlist: u.wishlist,
        };
      })
    );
    await User.insertMany(usersToInsert);

    console.log(`🎟️ Inserting ${seedEvents.length} Events into "events" collection...`);
    await Event.insertMany(seedEvents);

    console.log(`📄 Inserting ${seedBookings.length} Bookings into "bookings" collection...`);
    await Booking.insertMany(seedBookings);

    console.log(`========================================================`);
    console.log(` 🎉 ALL DATA STORED IN MONGODB COMPASS HOST: localhost:27017`);
    console.log(` 📂 Database: districtpulse_db`);
    console.log(`    ├── users    (${usersToInsert.length} documents)`);
    console.log(`    ├── events   (${seedEvents.length} documents)`);
    console.log(`    └── bookings (${seedBookings.length} documents)`);
    console.log(`========================================================`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error connecting to localhost:27017: ${err.message}`);
    console.log(`👉 Please ensure MongoDB is running locally.`);
    process.exit(1);
  }
}

pushToCompass();
