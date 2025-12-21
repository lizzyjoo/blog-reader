import { useState, useEffect } from "react";
import { getPostById } from "../api/api";
import CommentsSection from "./CommentsSection";
import NotFound from "../pages/NotFound";

export default function PostPage({ postId }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(postId);
      if (data.error) {
        setError(data.error);
      } else {
        setPost(data);
      }
    }
    fetchPost();
  }, [postId]); // dependency array includes postId to refetch if it changes

  if (error) {
    return <NotFound />; // 404 Not Found component?
  } else if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-div">
      <div className="post-content" key={postId}>
        <h3>{post.title}</h3>
        <p>by {post.author.username}</p>
        <p>{post.content}</p>
      </div>
      <CommentsSection comments={post.comments} />
    </div>
  );
}
