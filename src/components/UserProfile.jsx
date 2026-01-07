import { API_URL } from "../api/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCurrentUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import NotFound from "../pages/NotFound";
import ProfilePostCard from "./ProfilePostCard";
import SubscriptionPage from "./SubscriptionPage";
import FollowingPage from "./FollowingPage";
import FollowButton from "./FollowButton";
import "../styles/profile.css";

export default function UserProfile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const isOwnProfile = !username || currentUser?.username === username;

  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activeMenu, setActiveMenu] = useState("posts");

  useEffect(() => {
    async function fetchUser() {
      if (isOwnProfile && !username) {
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        const response = await fetch(
          `${API_URL}/users/${username || currentUser?.username}/profile`
        );
        const userData = await response.json();
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        setUser(userData);
      }
    }
    fetchUser();
  }, [username, isOwnProfile, currentUser]);

  useEffect(() => {
    // Reset state when username changes
    setActiveMenu("posts");
    setUser(null);
  }, [username]);

  const renderComponent = () => {
    switch (activeMenu) {
      case "posts":
        return (
          <div className="recent-post">
            <div className="profile-recent-text">
              {user.posts.length !== 0 && `Most Recent Post:`}
            </div>
            <div className="post-preview">
              {user.posts.length === 0 ? (
                <p>No posts yet—add one!</p>
              ) : (
                user.posts.map((post) => (
                  <ProfilePostCard key={post.id} post={post} />
                ))
              )}
            </div>
            {user._count.posts > 1 && (
              <Link to={`/users/${user.username}`} className="view-all-link">
                View all {user._count.posts} posts →
              </Link>
            )}
          </div>
        );
      case "subscribed":
        return <SubscriptionPage following={user.following} />;
      case "following":
        return <FollowingPage subscribers={user.subscribers} />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  if (notFound) return <NotFound />;

  const registeredDate = user.registeredDate;
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const registerDay = registeredDate.split("-")[2].split("T")[0];
  const registeMonth = months[Number(registeredDate.split("-")[1]) - 1];
  const registerYear = registeredDate.split("-")[0];

  return (
    <>
      <div className="profile-container">
        <div className="user-profile-title">
          <h1 className="profile-username">@{user.username}</h1>
        </div>

        <div className="profile-menu">
          <div className="user-info">
            Joined {registeMonth} {registerDay}, {registerYear}
          </div>
          <div className="user-info">
            <button
              className={activeMenu === "posts" ? "active" : ""}
              onClick={() => setActiveMenu("posts")}
            >
              Posts {user._count?.posts || 0}
            </button>

            <button
              className={activeMenu === "following" ? "active" : ""}
              onClick={() => setActiveMenu("following")}
            >
              <div>Subscribers {user._count?.subscribers || 0}</div>
            </button>
            <button
              className={activeMenu === "subscribed" ? "active" : ""}
              onClick={() => setActiveMenu("subscribed")}
            >
              Following {user._count?.following || 0}
            </button>
            {!isOwnProfile && <FollowButton username={user.username} />}
          </div>
        </div>
      </div>

      <main>{renderComponent()}</main>
    </>
  );
}
