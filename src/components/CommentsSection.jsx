import { useState, useEffect } from "react";
import { getComments } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Comments from "./Comments";
import "../styles/comments.css";

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments();
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
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      }
    );
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

      <h4>Comments</h4>

      {user && (
        <div className="write-comment">
          <form onSubmit={handleSubmit}>
            <div className="current-username">{user.username}</div>
            <textarea
              name="comment"
              id="comment"
              placeholder="Leave a comment for the author..."
              maxLength={2000}
            ></textarea>
            <button type="submit">Comment</button>
          </form>
        </div>
      )}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <Comments comment={comment} key={comment.id} />
        ))
      )}
    </div>
  );
}
