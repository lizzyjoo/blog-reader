//Fields: title, content

// On submit → POST request to /posts endpoint with JWT for authentication

// Optionally, include a published checkbox for draft vs public post

// After successful creation → redirect to PostPage

// CreatePost.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const content = editorRef.current.getContent();
    const newPost = await createPost({ title, content });
    if (newPost.id) {
      navigate(`/posts/${newPost.id}`); // redirect to the new post
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {/* TinyMCE editor would go here, setting content */}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button type="submit">Publish</button>
      {/* <button type="submit">Save</button> */}
    </form>
  );
}
