import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { useAuth } from "../context/AuthContext";
import { trashPost, getPostById, viewPost } from "../api/api";
import DOMPurify from "dompurify";
import CommentsSection from "./CommentsSection";
import LikeSaveButtons from "./LikeSaveButtons";
import NotFound from "../pages/NotFound";

export default function PostPage() {
  const { id, commentId } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const commentSectionRef = useRef(null);
  const hasViewed = useRef(false);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data.error) {
        setError(data.error);
      } else {
        setPost(data);
        if (!hasViewed.current) {
          hasViewed.current = true;
          viewPost(id);
        }
      }
    }
    fetchPost();
  }, [id]);

  const isAuthor = user?.id === post?.authorId;

  async function handleDelete() {
    if (confirm("Move this post to trash?")) {
      await trashPost(id, token);
      navigate("/me");
    }
  }

  function handleEdit() {
    // Remove async - not needed
    navigate(`/posts/${id}/edit`);
  }

  useEffect(() => {
    if (post && location.pathname.includes("/comments")) {
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
    return <NotFound />;
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

        <div className="post-actions-row">
          <LikeSaveButtons postId={post.id} initialLikes={post.likes} />
          <div className="view-count">{post.views} views</div>
        </div>

        {isAuthor && (
          <div className="author-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
      <div ref={commentSectionRef}>
        <CommentsSection postId={post.id} />
      </div>
    </div>
  );
}
