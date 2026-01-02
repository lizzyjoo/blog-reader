import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById } from "../api/api";
import { updatePost } from "../api/api";
import { Editor } from "@tinymce/tinymce-react";

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleSave(shouldPublish) {
    setSaving(true);
    const content = editorRef.current.getContent();
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
        setInitialContent(data.content);
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
      />

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        id="create-post-editor"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialContent}
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
            "code",
            "help",
            "wordcount",
            "autosave",
          ],

          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          autosave_interval: "30s",
          autosave_ask_before_unload: true,
          autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
          autosave_restore_when_empty: true,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

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
