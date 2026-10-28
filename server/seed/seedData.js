const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/userModel");
const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_CONNECTION_LINK ||
  "mongodb://127.0.0.1:27017/hotelpro";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB for seeding:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    // Clear existing records
    await User.deleteMany({});
    await Room.deleteMany({});
    await Booking.deleteMany({});
    console.log("Cleared existing database collections.");

    // 1. Create Default Users
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash("Admin@123", salt);
    const guestPasswordHash = await bcrypt.hash("Guest@123", salt);

    const adminUser = await User.create({
      name: "Hotel Admin",
      email: "admin@hotelpro.com",
      password: adminPasswordHash,
      phone: "9876543210",
      userType: "admin",
      gender: "Male",
      age: 32,
    });

    const guestUser = await User.create({
      name: "Arusha Agrawal",
      email: "guest@hotelpro.com",
      password: guestPasswordHash,
      phone: "9704927807",
      userType: "customer",
      gender: "Female",
      age: 26,
    });

    const testOrdinaryUser = await User.create({
      name: "Rahul Sharma",
      email: "rahul@hotelpro.com",
      password: guestPasswordHash,
      phone: "9704927800",
      userType: "ordinary",
      gender: "Male",
      age: 28,
    });

    console.log("Created 3 initial users (Admin, Customer, Ordinary).");

    // 2. Create Sample Rooms
    const sampleRooms = [
      {
        roomNumber: 101,
        count: 2,
        rent: 1500,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Spacious Deluxe Suite with king-size bed, private balcony with scenic view, complimentary breakfast, high-speed WiFi, and 24/7 room service.",
        currentbooking: [],
      },
      {
        roomNumber: 102,
        count: 1,
        rent: 900,
        type: "Non-Delux",
        photos: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Cozy standard Non-Deluxe room equipped with comfortable queen bed, air conditioning, workspace desk, and ensuite modern bathroom.",
        currentbooking: [],
      },
      {
        roomNumber: 103,
        count: 3,
        rent: 1200,
        type: "ordinary",
        photos: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Comfortable ordinary double room ideal for short stays, leisure travel, and business travelers seeking quiet comfort.",
        currentbooking: [],
      },
      {
        roomNumber: 104,
        count: 1,
        rent: 2500,
        type: "luxury",
        photos: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Executive Luxury Suite featuring jacuzzi bath, panoramic city skyline view, dedicated butler service, minibar, and premium lounge access.",
        currentbooking: [],
      },
      {
        roomNumber: 201,
        count: 2,
        rent: 1800,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Premium pool-facing Deluxe room with handcrafted oak furnishings, ultra-soft bedding, smart LED TV, and espresso machine.",
        currentbooking: [],
      },
      {
        roomNumber: 202,
        count: 1,
        rent: 1100,
        type: "Non-Delux",
        photos: [
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
        ],
        description:
          "Quiet Non-Delux corner room with garden view, climate control, high-speed optic fiber internet, and complimentary tea/coffee maker.",
        currentbooking: [],
      },
    ];

    const createdRooms = await Room.insertMany(sampleRooms);
    console.log(`Created ${createdRooms.length} rooms.`);

    // 3. Create Sample Bookings (matching SkillWallet screenshot records!)
    const sampleBooking1 = await Booking.create({
      roomid: createdRooms[0]._id, // Room 101 Delux
      userid: guestUser._id,
      username: guestUser.name,
      fromdate: "2026-11-01",
      todate: "2026-11-03",
      totaldays: 2,
      totalAmount: 3000,
      phone: guestUser.phone,
      cardDetails: {
        cardholdername: "Arusha Agrawal",
        cardnumber: "4532 8923 1120 7891",
        cvvcode: "342",
        expmonthyear: "08/28",
      },
      status: "booked",
    });

    const sampleBooking2 = await Booking.create({
      roomid: createdRooms[0]._id, // Room 101 Delux
      userid: guestUser._id,
      username: guestUser.name,
      fromdate: "2026-10-10",
      todate: "2026-10-12",
      totaldays: 2,
      totalAmount: 3000,
      phone: guestUser.phone,
      cardDetails: {
        cardholdername: "Arusha Agrawal",
        cardnumber: "4532 8923 1120 7891",
        cvvcode: "342",
        expmonthyear: "08/28",
      },
      status: "cancelled",
    });

    const sampleBooking3 = await Booking.create({
      roomid: createdRooms[3]._id, // Room 104 Luxury
      userid: testOrdinaryUser._id,
      username: testOrdinaryUser.name,
      fromdate: "2026-11-05",
      todate: "2026-11-08",
      totaldays: 3,
      totalAmount: 7500,
      phone: testOrdinaryUser.phone,
      cardDetails: {
        cardholdername: "Rahul Sharma",
        cardnumber: "5421 9832 7712 9021",
        cvvcode: "891",
        expmonthyear: "11/27",
      },
      status: "booked",
    });

    // Update room currentbooking arrays
    createdRooms[0].currentbooking.push(
      {
        booking_id: sampleBooking1._id,
        fromdate: sampleBooking1.fromdate,
        todate: sampleBooking1.todate,
        user_id: guestUser._id,
        status: "booked",
      },
      {
        booking_id: sampleBooking2._id,
        fromdate: sampleBooking2.fromdate,
        todate: sampleBooking2.todate,
        user_id: guestUser._id,
        status: "cancelled",
      }
    );
    await createdRooms[0].save();

    createdRooms[3].currentbooking.push({
      booking_id: sampleBooking3._id,
      fromdate: sampleBooking3.fromdate,
      todate: sampleBooking3.todate,
      user_id: testOrdinaryUser._id,
      status: "booked",
    });
    await createdRooms[3].save();

    console.log("Seeding completed successfully!");
    console.log("-----------------------------------------");
    console.log("Admin Account:    admin@hotelpro.com / Admin@123");
    console.log("Customer Account: guest@hotelpro.com / Guest@123");
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDatabase();
