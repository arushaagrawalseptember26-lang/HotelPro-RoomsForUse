const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      required: true,
      default: 1, // availability count
    },
    rent: {
      type: Number,
      required: true, // rent per day
    },
    type: {
      type: String,
      required: true,
      enum: ["Delux", "Non-Delux", "ordinary", "luxury"],
    },
    photos: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    currentbooking: [
      {
        booking_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking",
        },
        fromdate: {
          type: String,
          required: true,
        },
        todate: {
          type: String,
          required: true,
        },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          default: "booked",
        },
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
