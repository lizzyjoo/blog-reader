import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, getPosts } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProfilePostCard from "./ProfilePostCard";
import SubscriptionPage from "./SubscriptionPage";
import FollowButton from "./FollowButton";
import "../styles/profile.css";

export default function UserProfile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const isOwnProfile = !username || currentUser?.username === username;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("posts");
  const [sortBy, setSortBy] = useState("recent");

  const sortOptions = [
    { value: "recent", label: "Recent" },
    { value: "likes", label: "Most Liked" },
    { value: "comments", label: "Most Commented" },
    { value: "views", label: "Most Viewed" },
  ];

  useEffect(() => {
    async function fetchUser() {
      if (isOwnProfile && !username) {
        const userData = await getCurrentUser();
        console.log("User data:", userData);
        setUser(userData);
      } else {
        const response = await fetch(
          `http://localhost:3000/users/${
            username || currentUser?.username
          }/profile`
        );
        const userData = await response.json();
        setUser(userData);
      }
    }
    fetchUser();
  }, [username, isOwnProfile, currentUser]);

  useEffect(() => {
    async function fetchPosts() {
      if (!user) return;
      const data = await getPosts(sortBy, user.id, "published");
      setPosts(data);
    }
    fetchPosts();
  }, [user, sortBy]);

  const renderComponent = () => {
    switch (activeMenu) {
      case "posts":
        return (
          <div>
            <div className="sort-tabs">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={sortBy === option.value ? "active" : ""}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="posts-list">
              {posts.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                posts.map((post) => (
                  <ProfilePostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
        );
      case "subscribed":
        return <SubscriptionPage following={user.following} />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
      <div>
        <h1 className="profile-username">@{user.username}</h1>
        {!isOwnProfile && <FollowButton username={user.username} />}
        <div>
          <div>
            Joined {registeMonth} {registerDay}, {registerYear}
          </div>
          <div>Posts {user.posts?.length || 0}</div>
          <div>Subscribers {user._count?.subscribers || 0}</div>
          <button
            className={activeMenu === "posts" ? "active" : ""}
            onClick={() => setActiveMenu("posts")}
          >
            Posts
          </button>
          <button
            className={activeMenu === "subscribed" ? "active" : ""}
            onClick={() => setActiveMenu("subscribed")}
          >
            Following {user._count?.following || 0}
          </button>
        </div>
      </div>

      <main>{renderComponent()}</main>
    </>
  );
}
