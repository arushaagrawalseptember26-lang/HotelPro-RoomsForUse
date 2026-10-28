const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

// Helper to compute date difference in days (format DD-MM-YYYY or YYYY-MM-DD)
const computeDays = (fromdate, todate) => {
  try {
    const parseDate = (str) => {
      if (str.includes("-")) {
        const parts = str.split("-");
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          return new Date(parts[0], parts[1] - 1, parts[2]);
        } else {
          // DD-MM-YYYY
          return new Date(parts[2], parts[1] - 1, parts[0]);
        }
      }
      return new Date(str);
    };

    const d1 = parseDate(fromdate);
    const d2 = parseDate(todate);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  } catch {
    return 1;
  }
};

// @desc    Create a room booking
// @route   POST /api/bookings/bookroom or POST /bookroom
exports.bookroom = async (req, res) => {
  try {
    const {
      roomid,
      userid,
      username,
      fromdate,
      todate,
      totaldays,
      totalAmount,
      phone,
      cardDetails,
    } = req.body;

    if (!roomid || !fromdate || !todate) {
      return res.status(400).json({
        success: false,
        msg: "Missing required booking fields (roomid, fromdate, todate)",
      });
    }

    const room = await Room.findById(roomid);
    if (!room) {
      return res.status(404).json({ success: false, msg: "Room not found" });
    }

    // Calculate days and total amount if not explicitly given
    const calculatedDays = totaldays ? Number(totaldays) : computeDays(fromdate, todate);
    const calculatedAmount = totalAmount ? Number(totalAmount) : calculatedDays * room.rent;

    // Validate payment simulation fields
    const payment = cardDetails || {
      cardholdername: req.body.cardholdername || username || "Guest Cardholder",
      cardnumber: req.body.cardnumber || "**** **** **** 4242",
      cvvcode: req.body.cvvcode || "123",
      expmonthyear: req.body.expmonthyear || "12/28",
    };

    const newBooking = new Booking({
      roomid: room._id,
      userid: userid || (req.user ? req.user.id || req.user._id : null),
      username: username || (req.user ? req.user.name : "Guest User"),
      fromdate,
      todate,
      totaldays: calculatedDays,
      totalAmount: calculatedAmount,
      phone: phone || (req.user ? req.user.phone : "9876543210"),
      cardDetails: {
        cardholdername: payment.cardholdername,
        cardnumber: payment.cardnumber,
        cvvcode: payment.cvvcode,
        expmonthyear: payment.expmonthyear,
      },
      status: "booked",
    });

    const savedBooking = await newBooking.save();

    // Push into room's currentbooking array
    room.currentbooking.push({
      booking_id: savedBooking._id,
      fromdate,
      todate,
      user_id: savedBooking.userid,
      status: "booked",
    });

    await room.save();

    return res.status(200).json({
      success: true,
      msg: "Room booked successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to book room",
      error: error.message,
    });
  }
};

// @desc    Cancel a booking
// @route   POST /api/bookings/cancelbooking or POST /cancelbooking
exports.cancelbooking = async (req, res) => {
  try {
    const { bookingid, roomid } = req.body;

    if (!bookingid) {
      return res.status(400).json({ success: false, msg: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Free up or update in the corresponding room
    const targetRoomId = roomid || booking.roomid;
    if (targetRoomId) {
      const room = await Room.findById(targetRoomId);
      if (room) {
        room.currentbooking = room.currentbooking.map((b) => {
          if (b.booking_id && b.booking_id.toString() === bookingid.toString()) {
            b.status = "cancelled";
          }
          return b;
        });
        await room.save();
      }
    }

    return res.status(200).json({
      success: true,
      msg: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to cancel booking",
      error: error.message,
    });
  }
};

// @desc    Get bookings for logged-in user
// @route   GET /api/bookings/mybookings/:userid
exports.getUserBookings = async (req, res) => {
  try {
    const userid = req.params.userid || (req.user ? req.user.id || req.user._id : null);
    if (!userid) {
      return res.status(400).json({ success: false, msg: "User ID is required" });
    }

    const bookings = await Booking.find({ userid })
      .populate("roomid")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("User Bookings Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to fetch user bookings",
      error: error.message,
    });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/allbookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("roomid")
      .populate("userid", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("All Bookings Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to fetch all bookings",
      error: error.message,
    });
  }
};
