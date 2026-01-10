import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";

import Tiptap from "./Tiptap";
import "../styles/create-post.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSave(shouldPublish) {
    setSaving(true);
    const newPost = await createPost({
      title,
      content,
      published: shouldPublish,
    });
    setSaving(false);

    if (newPost.id) {
      navigate(`/posts/${newPost.id}`);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} id="create-post-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        name="title"
        id="create-post-title"
        className="write-post-title"
      />

      <Tiptap content="" onUpdate={(html) => setContent(html)} />

      <div className="form-actions">
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
    </form>
  );
}
