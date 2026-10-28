import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    badge: "5-Star Luxury & Comfort",
    title: "Experience Unrivaled Hospitality at RoomsForUse",
    desc: "Discover pristine Deluxe & Executive suites tailored for pure relaxation, corporate business stays, and unforgettable family retreats.",
  },
  {
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    badge: "Special Seasonal Rates",
    title: "Elegance, Privacy & World-Class Amenities",
    desc: "From private jacuzzi suites to panoramic city views, unlock the best rates with flexible cancellation and instant confirmation.",
  },
  {
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    badge: "Instant Online Booking",
    title: "Your Premier Destination for Modern Stays",
    desc: "Seamless room reservation with real-time room availability, verified reviews, and top-tier guest services.",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="hero-section">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-badge">{slides[current].badge}</span>
          <h1 className="hero-title">{slides[current].title}</h1>
          <p className="hero-desc">{slides[current].desc}</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#rooms-section" className="btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Explore Available Rooms
            </a>
            <Link to="/about" className="btn-secondary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              About RoomsForUse
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#ffffff",
          background: "rgba(15, 23, 42, 0.5)",
          padding: "0.75rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Previous Slide"
      >
        <FaChevronLeft size={18} />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#ffffff",
          background: "rgba(15, 23, 42, 0.5)",
          padding: "0.75rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Next Slide"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
};

export default HeroCarousel;
