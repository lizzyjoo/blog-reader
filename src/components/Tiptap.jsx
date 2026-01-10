// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
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
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Spacer } from "./tiptap-ui-primitive/spacer";
import { Node } from "@tiptap/core";

const Tiptap = ({ content, onUpdate }) => {
  const ScoreNode = Node.create({
    name: "score",
    group: "block",
    atom: true,

    addNodeView() {
      return ReactNodeViewRenderer(ScoreComponent);
    },
  });
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
        </ToolbarGroup>
      </Toolbar>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
