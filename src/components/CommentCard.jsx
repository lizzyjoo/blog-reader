import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import OptionsDropdown from "./OptionsDropdown";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CommentCard({ comment, onDelete, onUpdate }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const commentDate = new Date(comment.created_at);
  const commentDay = commentDate.getDate();
  const commentMonth = months[commentDate.getMonth()];
  const commentYear = commentDate.getFullYear();
  let commentHours = commentDate.getHours();
  let commentMinutes = commentDate.getMinutes();

  commentHours = commentHours < 10 ? "0" + commentHours : commentHours;
  commentMinutes = commentMinutes < 10 ? "0" + commentMinutes : commentMinutes;

  const formattedDateTime = `${commentMonth} ${commentDay}, ${commentYear} ${commentHours}:${commentMinutes}`;

  const canModify = user && (user.id === comment.author.id || user.isAdmin);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete(comment.id);
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        onUpdate(updatedComment);
        setIsEditing(false);
      } else {
        alert("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment");
    }
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="comment-card" id={`comment-${comment.id}`}>
      <div className="comment-header">
        <div className="comment-username">{comment.author.username}</div>
        <div className="comment-date">{formattedDateTime}</div>
        {canModify && !isEditing && (
          <OptionsDropdown
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
            className="comment"
          />
        )}
      </div>

      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="comment-edit-input"
          />
          <div className="comment-edit-buttons">
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button onClick={handleEdit} className="save-btn">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
    </div>
  );
}
