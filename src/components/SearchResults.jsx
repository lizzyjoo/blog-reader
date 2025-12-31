import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPosts } from "../api/api";
import PostCard from "./PostCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      setLoading(true);
      const data = await searchPosts(query);
      setPosts(data);
      setLoading(false);
    }
    fetchResults();
  }, [query]);

  if (loading) return <div>Searching...</div>;

  return (
    <div className="search-results">
      <h2>Results for "{query}"</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
