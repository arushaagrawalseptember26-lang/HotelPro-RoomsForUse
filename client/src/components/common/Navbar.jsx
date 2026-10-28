import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHotel, FaSignOutAlt, FaUserCircle, FaSuitcase, FaUserShield } from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/user/home") : "/"} className="nav-brand">
          <FaHotel size={24} style={{ color: "#60a5fa" }} />
          <span>RoomsForUse</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/user/home") : "/"} className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <li>
                  <Link to="/admin/dashboard" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <FaUserShield /> Admin Panel
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/user/bookings" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <FaSuitcase /> My Bookings
                  </Link>
                </li>
              )}

              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.5rem" }}>
                <span style={{ fontSize: "0.9rem", color: "#bfdbfe", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <FaUserCircle size={16} /> Hi, {user?.name || "Guest"}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-danger"
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                  title="Logout"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-secondary" style={{ padding: "0.45rem 1rem", fontSize: "0.88rem" }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn-primary" style={{ padding: "0.45rem 1rem", fontSize: "0.88rem" }}>
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
