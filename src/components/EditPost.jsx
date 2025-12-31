import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById } from "../api/api";
import { Editor } from "@tinymce/tinymce-react";

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setPublished(data.published);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id, user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const content = editorRef.current.getContent();

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published }),
      });

      if (response.ok) {
        navigate(`/posts/${id}`);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to update post");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
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
            autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
            autosave_restore_when_empty: true,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <div className="publish-toggle">
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(`/posts/${id}`)}>
            Cancel
          </button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
