const User = require("../models/userModel");
const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");

// @desc    Get all registered users
// @route   GET /api/admin/allusers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Admin All Users Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/allbookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("roomid")
      .populate("userid", "-password")
      .sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Admin All Bookings Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// @desc    Get system analytics & summary statistics
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: "booked" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });

    const revenueData = await Booking.aggregate([
      { $match: { status: "booked" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRooms,
        totalBookings,
        activeBookings,
        cancelledBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
