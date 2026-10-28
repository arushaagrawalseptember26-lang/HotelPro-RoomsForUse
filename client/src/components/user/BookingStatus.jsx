import React from "react";

const BookingStatus = ({ status }) => {
  const isBooked = status === "booked";
  return (
    <span className={`status-badge ${isBooked ? "badge-booked" : "badge-cancelled"}`}>
      {status ? status.toUpperCase() : "UNKNOWN"}
    </span>
  );
};

export default BookingStatus;
