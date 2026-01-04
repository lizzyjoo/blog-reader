// check if current password is equal to current
// = hash the input and see if they (the newly inputted vs. original password) match
// if so, put (edit) the current password to the new one
// before fetching backend stuff, confirm the new password & confirm new password input match
import { useState } from "react";

export default function ChangePassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handlePasswordChange(event) {
    event.preventDefault();

    const currentPassword = event.target.current_password.value;
    const newPassword = event.target.new_password.value;
    const passwordConfirm = event.target.password_confirm.value;
    if (newPassword !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    } else {
      setError("");
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:3000/settings/password",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword,
              newPassword,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
        } else {
          setSuccess("Password changed successfully");
          event.target.reset(); // Clear form
        }
      } catch (err) {
        console.log(err);
        setError("Failed to change password");
      }
    }
  }
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handlePasswordChange}>
        <label htmlFor="current_password">current password</label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          required
          autoComplete="current_password"
        ></input>
        <label htmlFor="new_password">new password</label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          required
          autoComplete="new_password"
        ></input>
        <label htmlFor="password_confirm">confirm new password</label>
        <input
          type="password"
          id="password_confirm"
          name="password_confirm"
          required
          autoComplete="new-password"
        ></input>
        <button type="submit">Change Password</button>
      </form>
    </>
  );
}
