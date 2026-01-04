import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts, getSubscribedPosts } from "../api/api";
import { useAuth } from "../context/AuthContext";
import PostCard from "./PostCard";

export default function PostList() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const feedType = searchParams.get("feed") || "all";

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const data =
          feedType === "subscribed"
            ? await getSubscribedPosts()
            : await getPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [feedType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>
          {feedType === "subscribed"
            ? "No posts from people you follow."
            : "No posts found."}
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
