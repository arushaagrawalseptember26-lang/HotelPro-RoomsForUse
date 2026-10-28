import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { bookingApi } from "../../services/api";
import { FaCalendarAlt, FaPhoneAlt, FaRupeeSign, FaSuitcase, FaArrowLeft } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const userid = user?._id || user?.id;
      const data = await bookingApi.getUserBookings(userid);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (booking) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel booking #${booking._id}? This will free up the room reservation.`
    );
    if (!confirmCancel) return;

    setCancellingId(booking._id);
    try {
      const roomid = booking.roomid?._id || booking.roomid;
      await bookingApi.cancelBooking(booking._id, roomid);
      await loadBookings();
    } catch (err) {
      alert("Failed to cancel booking: " + err.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <Link
            to="/user/home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.9rem",
              color: "#2563eb",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            <FaArrowLeft size={12} /> Back to Rooms
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>My Bookings</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            View and manage your room reservations and past stays.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>
          <p>Loading your bookings...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#dc2626" }}>
          <p>{error}</p>
          <button onClick={loadBookings} className="btn-primary" style={{ marginTop: "1rem" }}>
            Retry
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "3.5rem 2rem",
            borderRadius: "12px",
            textAlign: "center",
            border: "1px solid var(--border-color)",
          }}
        >
          <FaSuitcase size={48} color="#94a3b8" style={{ marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.5rem" }}>
            No Bookings Found
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            You haven't made any hotel reservations yet. Browse our luxury suites today!
          </p>
          <Link to="/user/home" className="btn-primary" style={{ display: "inline-block" }}>
            Explore Rooms Now
          </Link>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1.5rem" }}>
            {bookings.map((b) => {
              const isCancelled = b.status === "cancelled";
              const roomType = b.roomid?.type || "Delux";
              const roomNum = b.roomid?.roomNumber || "N/A";

              return (
                <div
                  key={b._id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                        borderBottom: "1px solid #f1f5f9",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)" }}>
                        {roomType} Room (Room #{roomNum})
                      </h3>
                      <span className={`status-badge ${isCancelled ? "badge-cancelled" : "badge-booked"}`}>
                        {b.status}
                      </span>
                    </div>

                    {/* Details matching SkillWallet screenshot */}
                    <div style={{ fontSize: "0.92rem", color: "#334155", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                      <div>
                        <strong>Booking ID:</strong> <span style={{ fontFamily: "monospace", color: "#475569" }}>{b._id}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FaCalendarAlt color="#2563eb" size={14} />
                        <span>
                          <strong>From:</strong> {b.fromdate} | <strong>To:</strong> {b.todate} ({b.totaldays} {b.totaldays === 1 ? "day" : "days"})
                        </span>
                      </div>
                      <div>
                        <strong>Total Amount:</strong>{" "}
                        <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e3a8a" }}>
                          ₹{b.totalAmount}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FaPhoneAlt color="#64748b" size={13} />
                        <span>
                          <strong>Customer Phone:</strong> {b.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <div>
                    {!isCancelled ? (
                      <button
                        onClick={() => handleCancelBooking(b)}
                        disabled={cancellingId === b._id}
                        style={{
                          width: "100%",
                          padding: "0.6rem 1rem",
                          borderRadius: "6px",
                          border: "1px solid #f43f5e",
                          color: "#e11d48",
                          background: "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#fff1f2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                        }}
                      >
                        {cancellingId === b._id ? "Cancelling..." : "CANCEL BOOKING"}
                      </button>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "0.5rem",
                          background: "#fef2f2",
                          borderRadius: "6px",
                          fontSize: "0.85rem",
                          color: "#991b1b",
                          fontWeight: 600,
                        }}
                      >
                        Reservation Cancelled &amp; Dates Released
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "2.5rem",
              padding: "1rem",
              background: "#ffffff",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            Total Bookings: {bookings.length}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
