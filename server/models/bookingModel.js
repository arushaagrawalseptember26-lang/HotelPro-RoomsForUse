const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cardDetails: {
      cardholdername: {
        type: String,
        required: true,
      },
      cardnumber: {
        type: String,
        required: true,
      },
      cvvcode: {
        type: String,
        required: true,
      },
      expmonthyear: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      default: "booked",
      enum: ["booked", "cancelled"],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
