import { useState, useEffect } from "react";
import { getPosts } from "../api/api";
import PostCard from "./PostCard";

export default function PostList() {
  // list of posts and setter
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // example of side effects: fetching data, timers, setting up event listeners, calling APIs,
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err, "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []); // empty dependency array means it runs once on mount
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
