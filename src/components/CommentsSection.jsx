import { useState, useEffect } from "react";
import { getComments } from "../api/api";

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments();
      const postComments = data.filter((comment) => comment.postId === postId);
      setComments(postComments);
    }
    fetchComments();
  }, [postId]);

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-div" key={comment.id}>
            <p>
              <strong>{comment.author.username}:</strong> {comment.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
