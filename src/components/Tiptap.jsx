// src/Tiptap.tsx
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "./tiptap-ui-primitive/toolbar";
import { Button } from "./tiptap-ui-primitive/button";
import { BoldIcon } from "./tiptap-icons/bold-icon";
import { ItalicIcon } from "./tiptap-icons/italic-icon";
import { ListIcon } from "./tiptap-icons/list-icon";
import { ListOrderedIcon } from "./tiptap-icons/list-ordered-icon";
import { LinkIcon } from "./tiptap-icons/link-icon";
import ScoreComponent from "./ScoreComponent";
import ScoreUploadModal from "./ScoreUploadModal";
import { Spacer } from "./tiptap-ui-primitive/spacer";
import { Node } from "@tiptap/core";

const ScoreNode = Node.create({
  name: "score",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      musicXml: {
        default: null,
        parseHTML: (element) => element.getAttribute("musicxml"),
        renderHTML: (attributes) => ({ musicxml: attributes.musicXml }),
      },
      startMeasure: {
        default: 1,
        parseHTML: (element) =>
          parseInt(element.getAttribute("startmeasure")) || 1,
        renderHTML: (attributes) => ({ startmeasure: attributes.startMeasure }),
      },
      endMeasure: {
        default: 8,
        parseHTML: (element) =>
          parseInt(element.getAttribute("endmeasure")) || 8,
        renderHTML: (attributes) => ({ endmeasure: attributes.endMeasure }),
      },
      zoom: {
        default: 0.7,
        parseHTML: (element) => parseFloat(element.getAttribute("zoom")) || 0.7,
        renderHTML: (attributes) => ({ zoom: attributes.zoom }),
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="score"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "score" }];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ScoreComponent);
  },
});

const Tiptap = ({ content, onUpdate, readOnly = false }) => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, ScoreNode],
    content: content || "<p></p>",
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        const html = editor.getHTML();
        onUpdate(html);
      }
    },
  });

  const handleInsertScore = (musicXml) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "score",
        attrs: { musicXml },
      })
      .run();
  };

  if (readOnly) {
    return <EditorContent editor={editor} />;
  }

  return (
    <div className="tiptap-editor">
      <Toolbar
        style={{ overflow: "visible", position: "relative", zIndex: 100 }}
      >
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "is-active" : ""}
          >
            <BoldIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "is-active" : ""}
          >
            <ItalicIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* List buttons */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor?.isActive("bulletList") ? "is-active" : ""}
            title="Bullet List"
          >
            <ListIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive("orderedList") ? "is-active" : ""}
            title="Numbered List"
          >
            <ListOrderedIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Format dropdown */}
        <ToolbarGroup>
          <div style={{ position: "relative", zIndex: 1000 }}>
            <Button
              data-style="ghost"
              onClick={() => setShowFormatMenu(!showFormatMenu)}
            >
              Format ▾
            </Button>
            {showFormatMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 9999,
                  minWidth: "150px",
                }}
              >
                <button
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    color: "black",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setShowFormatMenu(false);
                  }}
                >
                  Paragraph
                </button>
                <button
                  style={{
                    display: "block",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setShowFormatMenu(false);
                  }}
                >
                  Heading 1
                </button>
                <button
                  style={{
                    display: "block",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setShowFormatMenu(false);
                  }}
                >
                  Heading 2
                </button>
                <button
                  style={{
                    display: "block",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setShowFormatMenu(false);
                  }}
                >
                  Heading 3
                </button>
                <button
                  style={{
                    display: "block",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                    setShowFormatMenu(false);
                  }}
                >
                  Blockquote
                </button>
                <button
                  style={{
                    display: "block",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run();
                    setShowFormatMenu(false);
                  }}
                >
                  Code Block
                </button>
              </div>
            )}
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Score button */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => setShowScoreModal(true)}
            title="Insert Score"
          >
            <span
              className="tiptap-button-icon"
              style={{ fontSize: "1.25rem" }}
            >
              🎼
            </span>
          </Button>
        </ToolbarGroup>

        <Spacer />
      </Toolbar>

      <EditorContent editor={editor} />
      {showScoreModal && (
        <ScoreUploadModal
          onClose={() => setShowScoreModal(false)}
          onInsert={handleInsertScore}
        />
      )}
    </div>
  );
};

export default Tiptap;
