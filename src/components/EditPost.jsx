import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById, updatePost } from "../api/api";
import Tiptap from "./Tiptap";
import "../styles/create-post.css";

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleSave(shouldPublish) {
    setSaving(true);
    const newPost = await updatePost(id, {
      title,
      content,
      published: shouldPublish,
    });
    setSaving(false);

    if (newPost.id) {
      navigate(`/posts/${newPost.id}`);
    }
  }

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data.error) {
        setError(data.error);
      } else {
        if (user?.id !== data.authorId) {
          navigate("/");
          return;
        }
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id, user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="write-post-title"
      />

      <Tiptap content={content} onUpdate={setContent} />

      <div className="form-actions">
        <button type="button" onClick={() => navigate(`/posts/${id}`)}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
