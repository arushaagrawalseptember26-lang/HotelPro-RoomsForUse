const mongoose = require("mongoose");

const connectToMongo = async () => {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGODB_CONNECTION_LINK ||
    "mongodb://127.0.0.1:27017/hotelpro";

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("X MongoDB connection error:", error.message);
    // In production or development without local Mongo running immediately, don't crash hard if retrying
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectToMongo, 5000);
  }
};

// Handle connection lifecycle events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Attempting to reconnect...");
  setTimeout(connectToMongo, 5000);
});

module.exports = connectToMongo;
