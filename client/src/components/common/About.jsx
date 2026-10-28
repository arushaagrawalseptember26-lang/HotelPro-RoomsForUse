import React from "react";
import { FaShieldAlt, FaWifi, FaConciergeBell, FaBed, FaCreditCard, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1rem" }}>
          About RoomsForUse / HotelPro
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "750px", margin: "0 auto" }}>
          Your ultimate hotel management solution! Our system streamlines hotel operations with a secure, scalable backend, ensuring efficient booking, guest management, and payment simulation.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3.5rem" }}>
        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaBed size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>Smart Room Inventory</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Real-time tracking of room availability, categories (Delux, Non-Delux, luxury, ordinary), and dynamic per-day pricing.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaShieldAlt size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>Secure Authentication</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Bcrypt password hashing with JWT session tokens and role-based access control protecting administrative and customer endpoints.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaCreditCard size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>Simulated Checkout</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Full card payment simulation with live date-math duration calculation and automatic room reservation state locking.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaConciergeBell size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>Admin Control Hub</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            4-tab administrative dashboard providing instant oversight across all reservations, room catalog, addition forms, and user registry.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaWifi size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>Modern Amenities</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Complimentary high-speed WiFi, smart TV entertainment, room service, climate control, and luxury spa access.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ background: "#eff6ff", width: "50px", height: "50px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <FaHeadset size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>24/7 Guest Support</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Round-the-clock front desk assistance, instant cancellation with reservation freeing, and dedicated customer care.
          </p>
        </div>
      </div>

      <div style={{ background: "#1e293b", color: "#ffffff", padding: "2.5rem", borderRadius: "14px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>
          Ready for your relaxing stay?
        </h2>
        <p style={{ color: "#cbd5e1", maxWidth: "600px", margin: "0 auto 1.5rem auto", fontSize: "1rem" }}>
          Browse our curated selection of rooms and experience hospitality elevated to the highest standard.
        </p>
        <a href="/" className="btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "1rem", display: "inline-block" }}>
          View All Rooms
        </a>
      </div>
    </div>
  );
};

export default About;
