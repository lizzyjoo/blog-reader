import { API_URL } from "../api/api";
import { useState, useEffect } from "react";
import { getComments } from "../api/api";
import { useAuth } from "../context/AuthContext";
import CommentCard from "./CommentCard";
import "../styles/comments.css";

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(
      comments.map((c) => (c.id === updatedComment.id ? updatedComment : c))
    );
  };

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments();

      if (!Array.isArray(data)) {
        setComments([]);
        return;
      }

      const postComments = data
        .filter((comment) => comment.postId === postId)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setComments(postComments);
    }
    fetchComments();
  }, [postId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const comment = event.target.comment.value;
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment }),
    });
    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      event.target.reset();
    }
  }

  return (
    <div className={`comments-section ${!user ? "blurred" : ""}`}>
      {!user && (
        <div className="login-prompt">
          <p>Please log in to view and write comments.</p>
        </div>
      )}

      <h4 className="comments-title">Comments</h4>

      {user && (
        <div className="comment-input-wrapper">
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="comment-username">{user.username}</div>
            <div className="comment-input">
              {" "}
              <textarea
                name="comment"
                id="comment"
                placeholder="Leave a comment for the author..."
                maxLength={2000}
              />
              <button type="submit" className="comment-btn">
                <svg viewBox="0 0 752 752" className="send-icon">
                  <path
                    d="m573.18 198.62v0l-396.09 63.719c-7.75 0.85938-9.4727 11.195-3.4453 15.5l97.301 68.883-15.5 112.8c-0.85938 7.75 7.75 12.914 13.777 7.75l55.109-44.773 26.691 124.85c1.7227 7.75 11.195 9.4727 15.5 2.582l215.27-338.39c3.4414-6.0273-1.7266-13.777-8.6133-12.914zm-372.84 76.633 313.42-49.941-233.34 107.63zm74.051 165.32 12.914-92.133c80.938-37.027 139.49-64.578 229.04-105.91-1.7188 1.7227-0.85937 0.85938-241.95 198.04zm88.688 82.66-24.109-112.8 199.77-162.74z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              onDelete={handleCommentDelete}
              onUpdate={handleCommentUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
