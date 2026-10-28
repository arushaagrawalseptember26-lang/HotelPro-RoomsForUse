const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/bookroom", bookingController.bookroom);
router.post("/cancelbooking", bookingController.cancelbooking);
router.get("/mybookings/:userid", bookingController.getUserBookings);
router.get("/allbookings", bookingController.getAllBookings);

module.exports = router;
