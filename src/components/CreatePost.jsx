import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef(null);

  async function handleSave(shouldPublish) {
    setSaving(true);
    const content = editorRef.current.getContent();
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
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        id="create-post-editor"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "autosave",
          ],
          autosave_restore_when_empty: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_retention: "1440m", // Keep for 24 hours
          toolbar:
            "restoredraft | undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

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
