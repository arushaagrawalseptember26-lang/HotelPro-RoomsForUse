import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { roomApi } from "../../services/api";
import HeroCarousel from "../common/HeroCarousel";
import RoomCard from "../common/RoomCard";
import BookingModal from "../common/BookingModal";
import { FaSuitcase, FaSearch, FaFilter, FaCheckCircle } from "react-icons/fa";

const UserHome = () => {
  const { user, isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await roomApi.getRooms();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load rooms. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
  };

  const handleBookingCompleted = () => {
    setSelectedRoom(null);
    setBookingSuccess(true);
    fetchRooms();
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const filteredRooms = rooms
    .filter((room) => {
      const matchesType =
        filterType === "all" ||
        (room.type && room.type.toLowerCase() === filterType.toLowerCase());

      const matchesSearch =
        room.roomNumber.toString().includes(searchTerm) ||
        (room.type && room.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.rent - b.rent;
      if (sortBy === "price-high") return b.rent - a.rent;
      if (sortBy === "room-no") return a.roomNumber - b.roomNumber;
      return 0;
    });

  return (
    <div>
      {/* If authenticated user, show greeting banner */}
      {isAuthenticated && (
        <div className="user-banner">
          <div className="user-banner-inner">
            <div className="user-greeting">
              Welcome back, <span>{user?.name || "Guest"}</span>!
            </div>
            <Link to="/user/bookings" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FaSuitcase /> View My Bookings
            </Link>
          </div>
        </div>
      )}

      {/* Hero Showcase */}
      <HeroCarousel />

      {/* Success Notification Alert */}
      {bookingSuccess && (
        <div style={{ maxWidth: "1200px", margin: "1.5rem auto 0 auto", padding: "0 1rem" }}>
          <div
            style={{
              background: "#dcfce7",
              color: "#15803d",
              border: "1px solid #86efac",
              padding: "1rem 1.5rem",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaCheckCircle size={20} />
              <span>
                <strong>Reservation Confirmed!</strong> Your room has been booked successfully.
              </span>
            </div>
            <Link to="/user/bookings" style={{ textDecoration: "underline", fontWeight: 700 }}>
              Go to My Bookings &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div id="rooms-section" className="filter-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FaSearch color="var(--text-muted)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by room #, type or feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaFilter color="var(--text-muted)" />
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Room Types</option>
              <option value="delux">Delux Suites</option>
              <option value="non-delux">Non-Delux Standard</option>
              <option value="luxury">Executive Luxury</option>
              <option value="ordinary">Ordinary Family</option>
            </select>
          </div>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="room-no">Room Number</option>
          </select>
        </div>
      </div>

      {/* Main Room Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.1rem" }}>Loading available rooms...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#dc2626" }}>
          <p>{error}</p>
          <button onClick={fetchRooms} className="btn-primary" style={{ marginTop: "1rem" }}>
            Retry Loading
          </button>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>No rooms match your filter criteria.</p>
          <button
            onClick={() => {
              setFilterType("all");
              setSearchTerm("");
            }}
            className="btn-secondary"
            style={{ marginTop: "1rem" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="room-grid">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} onBookNow={handleBookNow} />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={handleBookingCompleted}
        />
      )}
    </div>
  );
};

export default UserHome;
