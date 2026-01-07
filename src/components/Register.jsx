const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OAuthButtons from "./OAuthButtons";
import "../styles/login.css";

//need to check if users are already looged in, if so redirect to home page
// handle for if user email already exists
// password difficulty handled in backend

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  async function handleRegister(event) {
    event.preventDefault();

    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm_password = event.target.confirm_password.value;
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      // redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="register-container">
      <div className="wrapper-top">
        <p className="text-1">Let's Create Your Acccount</p>
        <p className="text-2">Join urtext to begin your writing journey</p>
      </div>
      <div className="error-div">
        {error && (
          <p className="error-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
      <div className="wrapper-middle">
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className="login-input"
              type="text"
              id="first_name"
              name="first_name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="login-input"
              type="text"
              id="last_name"
              name="last_name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="login-input"
              type="text"
              id="username"
              name="username"
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              className="login-input"
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="login-submit">
            Register
          </button>
        </form>
      </div>
      <p className="oauth-text">( Or Continue With )</p>
      <div className="wrapper-bottom">
        <OAuthButtons />
      </div>
      <div className="register-div">
        Already have an account?{" "}
        <Link to="/login" className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
}
