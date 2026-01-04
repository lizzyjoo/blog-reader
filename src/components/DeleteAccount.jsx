import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleDelete(event) {
    event.preventDefault();

    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3000/settings/account/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete account");
    }
  }

  return (
    <div className="delete-account">
      <h2>Delete Account</h2>
      <p>This action is permanent and cannot be undone.</p>
      <p>All your posts, comments, and data will be deleted.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleDelete}>
        <label htmlFor="confirm">Type DELETE to confirm:</label>
        <input
          type="text"
          id="confirm"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <button type="submit" className="delete-btn">
          Delete My Account
        </button>
      </form>
    </div>
  );
}
