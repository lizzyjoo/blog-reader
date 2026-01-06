import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ManageSubscriptions() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFollowing() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setFollowing(userData.following);
      } catch (err) {
        setError("Failed to load subscriptions");
      }
      setLoading(false);
    }
    fetchFollowing();
  }, []);

  async function handleUnfollow(username) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/users/${username}/follow`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove from list
        setFollowing(following.filter((user) => user.username !== username));
      }
    } catch (err) {
      setError("Failed to unfollow");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="manage-subscriptions">
      <div className="setting-section-name">Following ({following.length})</div>

      {following.length === 0 ? (
        <p>You're not following anyone yet.</p>
      ) : (
        <div className="following-list">
          {following.map((user) => (
            <div key={user.id} className="following-item">
              <Link to={`/users/${user.username}/profile`}>
                @{user.username}
              </Link>

              <button
                onClick={() => handleUnfollow(user.username)}
                className="follow-btn"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
