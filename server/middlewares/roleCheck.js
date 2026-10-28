const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.userType !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access forbidden. Administrator privileges required.",
    });
  }
  next();
};

const requireCustomerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }
  next();
};

module.exports = {
  requireAdmin,
  requireCustomerOrAdmin,
};
