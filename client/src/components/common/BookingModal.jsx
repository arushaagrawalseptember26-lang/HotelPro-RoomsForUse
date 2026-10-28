import React, { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt, FaCreditCard, FaLock, FaRupeeSign } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { bookingApi } from "../../services/api";

const BookingModal = ({ room, onClose, onSuccess }) => {
  const { user } = useAuth();

  // Today and Tomorrow formatted as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [fromdate, setFromdate] = useState(today);
  const [todate, setTodate] = useState(tomorrow);
  const [phone, setPhone] = useState(user?.phone || "");
  const [username, setUsername] = useState(user?.name || "");

  // Payment form simulation
  const [cardholdername, setCardholdername] = useState(user?.name || "Guest Cardholder");
  const [cardnumber, setCardnumber] = useState("4532 8923 1120 7891");
  const [cvvcode, setCvvcode] = useState("342");
  const [expmonthyear, setExpmonthyear] = useState("12/28");

  const [totaldays, setTotaldays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(room.rent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Calculate days & total rent live
  useEffect(() => {
    if (fromdate && todate) {
      const d1 = new Date(fromdate);
      const d2 = new Date(todate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

      if (diffDays > 0) {
        setTotaldays(diffDays);
        setTotalAmount(diffDays * room.rent);
        setError("");
      } else {
        setTotaldays(0);
        setTotalAmount(0);
        setError("Check-out date must be after Check-in date");
      }
    }
  }, [fromdate, todate, room.rent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totaldays <= 0) {
      setError("Please select a valid date range (minimum 1 night stay).");
      return;
    }
    if (!phone || !cardholdername || !cardnumber || !cvvcode || !expmonthyear) {
      setError("Please fill in all booking and payment details.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        roomid: room._id,
        userid: user?._id || user?.id,
        username: username || user?.name || "Guest",
        fromdate,
        todate,
        totaldays,
        totalAmount,
        phone,
        cardDetails: {
          cardholdername,
          cardnumber,
          cvvcode,
          expmonthyear,
        },
      };

      await bookingApi.bookRoom(payload);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to complete booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)" }}>
              Book Room {room.roomNumber} ({room.type})
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              Rent: ₹{room.rent} per night | Max Capacity: {room.count || 1}
            </p>
          </div>
          <button onClick={onClose} className="modal-close">
            <FaTimes />
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <FaCalendarAlt color="#2563eb" /> Check-in Date
              </label>
              <input
                type="date"
                min={today}
                className="form-control"
                value={fromdate}
                onChange={(e) => setFromdate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <FaCalendarAlt color="#2563eb" /> Check-out Date
              </label>
              <input
                type="date"
                min={fromdate || today}
                className="form-control"
                value={todate}
                onChange={(e) => setTodate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Guest Full Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Summary Box */}
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "1rem 1.25rem",
              borderRadius: "8px",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "0.85rem", color: "#1e40af", fontWeight: 600 }}>Stay Duration</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a8a" }}>
                {totaldays} {totaldays === 1 ? "Night" : "Nights"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.85rem", color: "#1e40af", fontWeight: 600 }}>Total Payable Amount</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1e3a8a" }}>
                ₹{totalAmount}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "1rem", marginBottom: "1.25rem" }}>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <FaCreditCard color="#2563eb" /> Payment Simulation (Card Details)
            </h4>

            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                className="form-control"
                value={cardholdername}
                onChange={(e) => setCardholdername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="4532 8923 1120 7891"
                value={cardnumber}
                onChange={(e) => setCardnumber(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry (MM/YY)</label>
                <input
                  type="text"
                  placeholder="12/28"
                  className="form-control"
                  value={expmonthyear}
                  onChange={(e) => setExpmonthyear(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV Code</label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="123"
                  className="form-control"
                  value={cvvcode}
                  onChange={(e) => setCvvcode(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || totaldays <= 0}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "0.85rem",
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FaLock size={14} />
            {submitting ? "Processing Reservation..." : `Pay ₹${totalAmount} & Confirm Booking`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
