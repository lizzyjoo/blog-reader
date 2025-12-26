import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
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
    <div className="register">
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" required />
        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" required />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          autoComplete="username"
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
