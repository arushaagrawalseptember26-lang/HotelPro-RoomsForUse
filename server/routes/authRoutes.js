const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const fetchUser = require("../middlewares/fetchUser");

// Support both PascalCase and lowercase endpoint conventions
router.post("/SignUp", authController.signUp);
router.post("/signup", authController.signUp);
router.post("/Login", authController.login);
router.post("/login", authController.login);

router.get("/profile", fetchUser, authController.getProfile);

module.exports = router;
