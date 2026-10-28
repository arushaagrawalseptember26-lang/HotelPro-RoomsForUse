import React from "react";
import { Link } from "react-router-dom";
import { FaHotel, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <FaHotel size={22} color="#60a5fa" />
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>RoomsForUse</span>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#94a3b8" }}>
            HotelPro - Complete hotel booking and management solution. Providing end-to-end hospitality booking, real-time inventory tracking, and intuitive administrative oversight.
          </p>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", marginBottom: "1rem", fontSize: "1rem" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
            <li><Link to="/" style={{ color: "#94a3b8" }}>Home & Suites</Link></li>
            <li><Link to="/about" style={{ color: "#94a3b8" }}>About HotelPro</Link></li>
            <li><Link to="/login" style={{ color: "#94a3b8" }}>Customer Login</Link></li>
            <li><Link to="/signup" style={{ color: "#94a3b8" }}>Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", marginBottom: "1rem", fontSize: "1rem" }}>Room Categories</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
            <li><span style={{ color: "#94a3b8" }}>Deluxe Suites</span></li>
            <li><span style={{ color: "#94a3b8" }}>Non-Deluxe Standard</span></li>
            <li><span style={{ color: "#94a3b8" }}>Executive Luxury Suites</span></li>
            <li><span style={{ color: "#94a3b8" }}>Ordinary Family Rooms</span></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "#ffffff", marginBottom: "1rem", fontSize: "1rem" }}>Hospitality Desk</h4>
          <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <FaMapMarkerAlt color="#60a5fa" /> 104 Grand Boulevard, Suites District
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <FaPhone color="#60a5fa" /> +1 (800) 555-HOTEL
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <FaEnvelope color="#60a5fa" /> support@hotelpro.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} HotelPro / RoomsForUse. Built with <FaHeart color="#ef4444" style={{ verticalAlign: "middle" }} /> for SkillWallet MERN Full-Stack Submission.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
