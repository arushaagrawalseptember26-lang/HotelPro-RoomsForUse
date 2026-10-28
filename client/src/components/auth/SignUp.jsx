import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserPlus } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("customer");
  const [gender, setGender] = useState("Not specified");
  const [age, setAge] = useState(25);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const data = await signup({
        name,
        email,
        password,
        c_password: confirmPassword,
        phone,
        userType,
        gender,
        age: Number(age),
      });

      if (data.user?.userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Try with another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left side illustration matching SkillWallet rubric */}
        <div className="auth-illustration">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="150" height="110" rx="8" fill="#3B82F6" opacity="0.12" />
            <rect x="35" y="40" width="130" height="90" rx="6" fill="#1E3A8A" />
            <rect x="45" y="50" width="110" height="70" rx="4" fill="#FFFFFF" />
            <circle cx="100" cy="80" r="14" fill="#2563EB" />
            <path d="M80 105 C80 95, 120 95, 120 105 Z" fill="#60A5FA" />
            <rect x="70" y="145" width="60" height="10" rx="3" fill="#94A3B8" />
            <circle cx="150" cy="45" r="7" fill="#F59E0B" />
          </svg>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)", marginTop: "1rem" }}>
            Join RoomsForUse
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.4rem", maxWidth: "260px" }}>
            Unlock exclusive hospitality rates, instant room reservations, and transparent booking management.
          </p>
        </div>

        {/* Right side form */}
        <div className="auth-form-side">
          <h1 className="auth-title">Register for the Account</h1>
          <p className="auth-subtitle">Create an account to book and manage luxury rooms.</p>

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

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Arusha Agrawal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
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
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Enter Mobile no</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Select Role</label>
                <select
                  className="form-control"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="customer">Ordinary / Customer</option>
                  <option value="admin">Hotel Administrator</option>
                </select>
              </div>
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
              <FaUserPlus /> {loading ? "Creating Account..." : "REGISTER"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.92rem", color: "var(--text-muted)" }}>
            Had an account?{" "}
            <Link to="/login" style={{ color: "#2563eb", fontWeight: 600 }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
