const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hotelpro_roomsforuse_jwt_secret_key_2026";

const fetchUser = (req, res, next) => {
  // Get the token from header
  const authHeader = req.header("Authorization") || req.header("auth-token");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No authentication token provided.",
    });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
      error: error.message,
    });
  }
};

module.exports = fetchUser;
