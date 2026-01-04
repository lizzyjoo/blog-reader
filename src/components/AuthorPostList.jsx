// display user's post list (user homepage)
// allow user to add new post, edit post, delete post
// allow user to sort posts (most recent, most liked, most commented, saved)
// access logic similar to userprofile, ppl and user themselves can both view,
// tho logged in users have more rights on things
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, getPosts } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProfilePostCard from "./ProfilePostCard";
import SubscriptionPage from "./SubscriptionPage";
import FollowButton from "./FollowButton";
import "../styles/profile.css";
export default function AuthorPostList() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const isOwnProfile = !username || currentUser?.username === username;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("posts");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const postTabs = [
    { value: "all", label: "All" },
    { value: "published", label: "Published" },
    { value: "drafts", label: "Drafts" },
    { value: "trash", label: "Trash" },
  ];

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

      const data = await getPosts(
        sortBy,
        user.id,
        isOwnProfile ? activeTab : "published"
      );
      setPosts(data);
    }
    fetchPosts();
  }, [user, activeTab, sortBy, isOwnProfile]);

  const renderComponent = () => {
    switch (activeMenu) {
      case "posts":
        return (
          <div>
            {isOwnProfile && (
              <div className="post-tabs">
                {postTabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={activeTab === tab.value ? "active" : ""}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

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
                  <ProfilePostCard
                    key={post.id}
                    post={post}
                    isOwnProfile={isOwnProfile}
                    isTrashView={activeTab === "trash"}
                    onPostUpdate={() => setActiveTab(activeTab)} // trigger refetch
                  />
                ))
              )}
            </div>
          </div>
        );
      case "subscribed":
        return <SubscriptionPage />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const registeredDate = user.registeredDate;
  console.log(registeredDate);

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
