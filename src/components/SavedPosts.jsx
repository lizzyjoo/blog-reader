import { useState, useEffect } from "react";
import SavedPostCard from "./SavedPostCard";

// only logged in users can access, else redirected to sign in page
// if other users try to access, they are not authorized
// check: logged in? if so, are they the user?
export default function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  // sort by newest, oldest in terms of recently saved
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    async function fetchSavedPosts() {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/users/saved?sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userSavedPosts = await response.json();
      setSavedPosts(userSavedPosts);
    }
    fetchSavedPosts();
  }, [sortBy]);
  function toggleSort() {
    setSortBy(sortBy === "recent" ? "oldest" : "recent");
  }
  return (
    <>
      <div>
        <h2>Saved posts</h2>
        <button className="sortBtn" onClick={toggleSort}>
          {sortBy === "recent" ? "Most Recent" : "Oldest"}
        </button>
        <div>
          {savedPosts.length === 0 ? (
            <p>No saved posts yet.</p>
          ) : (
            savedPosts.map((post) => (
              <SavedPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
