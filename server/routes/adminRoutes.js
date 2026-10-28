const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/allusers", adminController.getAllUsers);
router.get("/allbookings", adminController.getAllBookings);
router.get("/stats", adminController.getStats);

module.exports = router;
