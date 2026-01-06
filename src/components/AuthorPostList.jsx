// display user's post list (user homepage)
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, getPosts } from "../api/api";
import { useAuth } from "../context/AuthContext";
import PostCard from "./PostCard";
import SortDropdown from "./SortDropdown";
import NotFound from "../pages/NotFound";
import "../styles/profile.css";
export default function AuthorPostList() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const isOwnProfile = !username || currentUser?.username === username;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
          `http://localhost:3000/users/${username || currentUser?.username}`
        );
        if (response.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setLoading(false);
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

  useEffect(() => {
    // Reset state when navigating to a different user
    setActiveTab("all");
    setSortBy("recent");
    setUser(null);
    setLoading(true);
    setNotFound(false);
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (notFound) return <NotFound />;
  if (!user) return <NotFound />;

  const registeredDate = user.registeredDate;
  console.log(registeredDate);

  return (
    <>
      <main>
        <div className="postlist-container">
          <div
            className={`postlist-menu ${!isOwnProfile ? "not-own-menu" : ""}`}
          >
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
            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={sortOptions}
            />
          </div>

          <div className="posts-list">
            {posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isOwnProfile={isOwnProfile}
                  isTrashView={activeTab === "trash"}
                  onPostUpdate={() => setActiveTab(activeTab)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
