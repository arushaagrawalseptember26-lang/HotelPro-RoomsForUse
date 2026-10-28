import React, { useState } from "react";
import { FaUserFriends, FaChevronLeft, FaChevronRight, FaTag } from "react-icons/fa";

const RoomCard = ({ room, onBookNow }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos =
    room.photos && room.photos.length > 0
      ? room.photos
      : [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        ];

  const nextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="room-card">
      <div className="room-img-container">
        <img
          src={photos[photoIndex]}
          alt={`Room ${room.roomNumber}`}
          className="room-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <span className="room-badge">{room.type}</span>

        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              style={{
                position: "absolute",
                left: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                padding: "0.35rem",
                borderRadius: "50%",
                display: "flex",
              }}
              title="Previous Photo"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={nextPhoto}
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                padding: "0.35rem",
                borderRadius: "50%",
                display: "flex",
              }}
              title="Next Photo"
            >
              <FaChevronRight size={12} />
            </button>
          </>
        )}
      </div>

      <div className="room-details">
        <h3 className="room-title">Room {room.roomNumber}</h3>

        <div className="room-meta">
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <FaUserFriends /> Capacity: {room.count || 1} {room.count === 1 ? "Person" : "People"}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <FaTag /> Type: {room.type}
          </span>
        </div>

        <p className="room-desc">{room.description}</p>

        <div className="room-footer">
          <div className="room-price">
            ₹{room.rent} <span>/ day</span>
          </div>
          <button
            onClick={() => onBookNow(room)}
            className="btn-primary"
            style={{ padding: "0.55rem 1.25rem", fontSize: "0.9rem" }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
