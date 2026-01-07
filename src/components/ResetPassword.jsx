import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  if (!token) {
    return <div>Invalid reset link</div>;
  }

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          autoComplete="new-password"
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
