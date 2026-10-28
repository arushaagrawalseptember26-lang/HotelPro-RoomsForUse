import React, { useState, useEffect } from "react";
import { adminApi, roomApi, bookingApi } from "../../services/api";
import {
  FaCalendarCheck,
  FaBed,
  FaPlusCircle,
  FaUsers,
  FaTrashAlt,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "rooms" | "addroom" | "users"

  // Data states
  const [allBookings, setAllBookings] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  // Add Room Form state
  const [roomNumber, setRoomNumber] = useState("");
  const [count, setCount] = useState("");
  const [rent, setRent] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [roomType, setRoomType] = useState("Delux");
  const [description, setDescription] = useState("");
  const [submittingRoom, setSubmittingRoom] = useState(false);

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const showNotification = (text, type = "success") => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback({ text: "", type: "" }), 5000);
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [bookingsData, roomsData, usersData, statsData] = await Promise.all([
        adminApi.getAllBookings().catch(() => []),
        roomApi.getRooms().catch(() => []),
        adminApi.getAllUsers().catch(() => []),
        adminApi.getStats().catch(() => null),
      ]);

      setAllBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setAllRooms(Array.isArray(roomsData) ? roomsData : []);
      setAllUsers(Array.isArray(usersData) ? usersData : []);
      if (statsData?.stats) {
        setStats(statsData.stats);
      }
    } catch {
      showNotification("Error loading some admin data", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Room Submission
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!roomNumber || !rent) {
      showNotification("Room Number and Rent are required", "error");
      return;
    }

    setSubmittingRoom(true);
    try {
      const photoUrls = [image1, image2, image3].filter((url) => url && url.trim().length > 0);

      const payload = {
        roomNumber: Number(roomNumber),
        count: count ? Number(count) : 2,
        rent: Number(rent),
        type: roomType,
        photos:
          photoUrls.length > 0
            ? photoUrls
            : [
                "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
              ],
        description: description || `Executive ${roomType} suite with premium amenities.`,
      };

      await roomApi.addRoom(payload);
      showNotification(`Room ${roomNumber} created successfully!`, "success");

      // Reset form
      setRoomNumber("");
      setCount("");
      setRent("");
      setImage1("");
      setImage2("");
      setImage3("");
      setDescription("");

      // Switch to rooms tab & refresh
      await loadAllAdminData();
      setActiveTab("rooms");
    } catch (err) {
      showNotification(err.message || "Failed to create room", "error");
    } finally {
      setSubmittingRoom(false);
    }
  };

  // Handle Delete Room
  const handleDeleteRoom = async (id, roomNum) => {
    if (!window.confirm(`Are you sure you want to delete Room #${roomNum}?`)) return;

    try {
      await roomApi.deleteRoom(id);
      showNotification(`Room #${roomNum} deleted successfully!`, "success");
      await loadAllAdminData();
    } catch (err) {
      showNotification(err.message || "Failed to delete room", "error");
    }
  };

  return (
    <div>
      {/* Admin Sub-header Banner */}
      <div className="admin-header-banner">
        <h1 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          Hotel Administrator Control Center
        </h1>
        <p style={{ color: "#bfdbfe", fontSize: "0.95rem" }}>
          Full visibility into bookings, room inventory, customer registry, and live operations.
        </p>

        {stats && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#e0e7ff" }}>Total Bookings:</span>{" "}
              <strong>{stats.totalBookings}</strong>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#e0e7ff" }}>Total Rooms:</span>{" "}
              <strong>{stats.totalRooms}</strong>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#e0e7ff" }}>Registered Users:</span>{" "}
              <strong>{stats.totalUsers}</strong>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#e0e7ff" }}>Total Revenue:</span>{" "}
              <strong>₹{stats.totalRevenue}</strong>
            </div>
          </div>
        )}
      </div>

      {/* 4 Tabs matching SkillWallet screenshot */}
      <div className="admin-nav-tabs">
        <button
          className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <FaCalendarCheck style={{ marginRight: "0.4rem" }} /> ALL BOOKINGS
        </button>
        <button
          className={`admin-tab ${activeTab === "rooms" ? "active" : ""}`}
          onClick={() => setActiveTab("rooms")}
        >
          <FaBed style={{ marginRight: "0.4rem" }} /> ALL ROOMS
        </button>
        <button
          className={`admin-tab ${activeTab === "addroom" ? "active" : ""}`}
          onClick={() => setActiveTab("addroom")}
        >
          <FaPlusCircle style={{ marginRight: "0.4rem" }} /> ADD ROOM
        </button>
        <button
          className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <FaUsers style={{ marginRight: "0.4rem" }} /> ALL USERS
        </button>
      </div>

      {/* Notifications */}
      {feedback.text && (
        <div style={{ maxWidth: "1200px", margin: "0 auto 1.5rem auto", padding: "0 1rem" }}>
          <div
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "8px",
              background: feedback.type === "error" ? "#fee2e2" : "#dcfce7",
              color: feedback.type === "error" ? "#b91c1c" : "#15803d",
              fontWeight: 600,
            }}
          >
            {feedback.text}
          </div>
        </div>
      )}

      {/* TAB 1: ALL BOOKINGS */}
      {activeTab === "bookings" && (
        <div className="table-responsive">
          <div className="table-header-title">
            <span>All Hotel Reservations</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>Total Bookings: {allBookings.length}</span>
          </div>

          {allBookings.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
              No reservations found in database.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Name</th>
                  <th>Room #</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Total Days</th>
                  <th>Amount</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{b._id}</td>
                    <td><strong>{b.username || b.userid?.name || "Guest"}</strong></td>
                    <td>Room {b.roomid?.roomNumber || "N/A"} ({b.roomid?.type || "Delux"})</td>
                    <td>{b.fromdate}</td>
                    <td>{b.todate}</td>
                    <td>{b.totaldays} nights</td>
                    <td><strong>₹{b.totalAmount}</strong></td>
                    <td>{b.phone}</td>
                    <td>
                      <span className={`status-badge ${b.status === "cancelled" ? "badge-cancelled" : "badge-booked"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 2: ALL ROOMS (Hotel Room Booking History table) */}
      {activeTab === "rooms" && (
        <div className="table-responsive">
          <div className="table-header-title">
            <span>Hotel Room Booking History</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>Total Rooms: {allRooms.length}</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Rent / Day</th>
                <th>Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allRooms.map((r) => (
                <tr key={r._id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{r._id}</td>
                  <td><strong>{r.roomNumber}</strong></td>
                  <td>{r.count || 1} {r.count === 1 ? "Person" : "People"}</td>
                  <td><strong>₹{r.rent}</strong></td>
                  <td>
                    <span
                      style={{
                        background: "#dbeafe",
                        color: "#1e40af",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "12px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                      }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td style={{ maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {r.description}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRoom(r._id, r.roomNumber)}
                      className="btn-outline-danger"
                      style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.3rem 0.6rem" }}
                      title="Delete Room"
                    >
                      <FaTrashAlt size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: ADD ROOM */}
      {activeTab === "addroom" && (
        <div style={{ maxWidth: "800px", margin: "0 auto 3rem auto" }}>
          <div className="table-responsive">
            <div className="table-header-title" style={{ justifyContent: "center" }}>
              <span>Add a New Room</span>
            </div>

            <form onSubmit={handleAddRoom} style={{ padding: "2rem" }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Room Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 301"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Capacity (No. of people)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 2"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Room Rent per day (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 1500"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Room Photos */}
              <div className="form-group" style={{ marginTop: "0.5rem" }}>
                <label className="form-label">Room Photos (Image URLs)</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Image 1 URL"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  style={{ marginBottom: "0.5rem" }}
                />
                <input
                  type="url"
                  className="form-control"
                  placeholder="Image 2 URL"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  style={{ marginBottom: "0.5rem" }}
                />
                <input
                  type="url"
                  className="form-control"
                  placeholder="Image 3 URL"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                />
              </div>

              {/* Room Type Radio */}
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">Room Type</label>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="roomType"
                      value="Delux"
                      checked={roomType === "Delux"}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                    Delux
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="roomType"
                      value="Non-Delux"
                      checked={roomType === "Non-Delux"}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                    Non-Delux
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="roomType"
                      value="luxury"
                      checked={roomType === "luxury"}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                    Luxury
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="roomType"
                      value="ordinary"
                      checked={roomType === "ordinary"}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                    Ordinary
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="form-label">Room Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Detailed description of room furnishings, amenities, views, and perks..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={submittingRoom}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  fontSize: "1rem",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaPlusCircle /> {submittingRoom ? "Adding Room..." : "ADD ROOM"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: ALL USERS */}
      {activeTab === "users" && (
        <div className="table-responsive">
          <div className="table-header-title">
            <span>All Registered Users</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>Total Users: {allUsers.length}</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role / Type</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u._id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{u._id}</td>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        u.userType === "admin" ? "badge-admin" : "badge-ordinary"
                      }`}
                    >
                      {u.userType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
