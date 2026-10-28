const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hotelpro_roomsforuse_jwt_secret_key_2026";

// @desc    Register a new user (Customer or Admin)
// @route   POST /api/user/SignUp or POST /SignUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, c_password, confirmPassword, phone, userType, gender, age } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all required fields (name, email, password, phone)",
        status: "false",
      });
    }

    // Password confirmation check if passed
    const confirm = c_password || confirmPassword;
    if (confirm && password !== confirm) {
      return res.status(400).json({
        success: false,
        msg: "Passwords do not match",
        status: "false",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already register",
        status: "false",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Normalize userType
    let assignedType = "ordinary";
    if (userType) {
      const lower = userType.toLowerCase();
      if (lower === "admin") assignedType = "admin";
      else if (lower === "customer") assignedType = "customer";
      else assignedType = "ordinary";
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      userType: assignedType,
      gender: gender || "Not specified",
      age: age ? Number(age) : 25,
    });

    // Create JWT
    const token = jwt.sign(
      {
        id: newUser._id,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      userType: newUser.userType,
      gender: newUser.gender,
      age: newUser.age,
    };

    return res.status(200).json({
      success: true,
      msg: "User registered successfully",
      status: "true",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      status: "false",
      error: error.message,
    });
  }
};

// @desc    Login user & get JWT token
// @route   POST /api/user/Login or POST /Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide email and password",
        status: "false",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials. User not found.",
        status: "false",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email or password",
        status: "false",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      gender: user.gender,
      age: user.age,
    };

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      status: "true",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      status: "false",
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/user/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
