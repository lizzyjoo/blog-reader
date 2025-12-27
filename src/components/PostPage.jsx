import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { getPostById } from "../api/api";
import CommentsSection from "./CommentsSection";
import NotFound from "../pages/NotFound";

export default function PostPage() {
  const { id, commentId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const commentSectionRef = useRef(null);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data.error) {
        setError(data.error);
      } else {
        setPost(data);
      }
    }
    fetchPost();
  }, [id]); // dependency array includes postId to refetch if it changes

  // scroll to bottom of post content for comments
  useEffect(() => {
    if (post && location.pathname.includes("/comments")) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        if (commentId) {
          const commentEl = document.getElementById(`comment-${commentId}`);
          if (commentEl) {
            commentEl.scrollIntoView({ behavior: "smooth" });
          }
        } else if (commentSectionRef.current) {
          commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [post, location.pathname, commentId]);

  if (error) {
    return <NotFound />; // 404 Not Found component?
  } else if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-div">
      <div className="post-content" key={id}>
        <h3>{post.title}</h3>
        <p>by {post.author.username}</p>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </div>
      <div ref={commentSectionRef}>
        <CommentsSection postId={post.id} />
      </div>
    </div>
  );
}
