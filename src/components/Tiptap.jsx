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
import ScoreComponent from "./ScoreComponent";
import ScoreUploadModal from "./ScoreUploadModal";
import { Spacer } from "./tiptap-ui-primitive/spacer";
import { Node } from "@tiptap/core";

const ScoreNode = Node.create({
  name: "score",
  group: "block",
  atom: true,
  // https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing
  addAttributes() {
    return {
      musicXml: {
        default: null,
      },
      startMeasure: { default: 1 },
      endMeasure: { default: 8 },
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
    // this lets Tiptap pass the whole node object as a prop automatically
    return ReactNodeViewRenderer(ScoreComponent);
  },
});
const Tiptap = ({ content, onUpdate }) => {
  const [showScoreModal, setShowScoreModal] = useState(false);

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

  const editor = useEditor({
    extensions: [StarterKit, ScoreNode], // define your extension array
    content: content || "<p></p>", // initial content
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onUpdate) {
        onUpdate(html);
      }
      console.log(html);
    },
  });

  return (
    <div className="tiptap-editor">
      <Toolbar>
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <BoldIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <ItalicIcon className="tiptap-button-icon" />
          </Button>
          <Button data-style="ghost" onClick={() => setShowScoreModal(true)}>
            🎼
          </Button>
        </ToolbarGroup>
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
