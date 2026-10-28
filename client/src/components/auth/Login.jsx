import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignInAlt, FaHotel, FaCheckCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ email, password });
      if (data.user?.userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      setError(err.message || "Login failed. Check your email & password.");
    } finally {
      setLoading(false);
    }
  };

  const fillQuick = (testEmail, testPass) => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left side illustration matching SkillWallet rubric */}
        <div className="auth-illustration">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="40" width="140" height="100" rx="8" fill="#3B82F6" opacity="0.15" />
            <rect x="40" y="50" width="120" height="80" rx="6" fill="#1E3A8A" />
            <rect x="50" y="60" width="100" height="60" rx="4" fill="#FFFFFF" />
            <circle cx="100" cy="90" r="15" fill="#3B82F6" />
            <path d="M75 140 L125 140 L135 155 L65 155 Z" fill="#94A3B8" />
            <circle cx="150" cy="50" r="8" fill="#10B981" />
            <rect x="60" y="70" width="30" height="4" rx="2" fill="#CBD5E1" />
            <rect x="60" y="80" width="20" height="4" rx="2" fill="#E2E8F0" />
          </svg>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)", marginTop: "1rem" }}>
            RoomsForUse Portal
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.4rem", maxWidth: "260px" }}>
            Experience hassle-free reservations, guaranteed room keys, and automated checkouts.
          </p>
        </div>

        {/* Right side form */}
        <div className="auth-form-side">
          <h1 className="auth-title">Login for the Account</h1>
          <p className="auth-subtitle">Sign in to access your hotel reservation dashboard.</p>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                marginBottom: "1.25rem",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.8rem",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <FaSignInAlt /> {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div
            style={{
              marginTop: "1.5rem",
              padding: "0.85rem",
              background: "#f8fafc",
              border: "1px dashed var(--border-color)",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
              ⚡ QUICK FILL DEMO CREDENTIALS:
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => fillQuick("guest@hotelpro.com", "Guest@123")}
                style={{
                  background: "#e0f2fe",
                  color: "#0369a1",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "4px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                Customer (guest@hotelpro.com)
              </button>
              <button
                type="button"
                onClick={() => fillQuick("admin@hotelpro.com", "Admin@123")}
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "4px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                Admin (admin@hotelpro.com)
              </button>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.92rem", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#2563eb", fontWeight: 600 }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
