import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OAuthButtons from "./OAuthButtons";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function isEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  async function handleLogin(event) {
    event.preventDefault();

    const loginInput = event.target.login_input.value;
    const password = event.target.password.value;

    // Determine if input is email or username
    const payload = isEmail(loginInput)
      ? { email: loginInput, password }
      : { username: loginInput, password };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login_input">Username or Email</label>
          <input
            type="text"
            id="login_input"
            name="login_input"
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
        <OAuthButtons />
        <div>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
