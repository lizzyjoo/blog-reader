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
    // https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing
    addAttributes() {
      return {
        musicXml: {
          default: null,
        },
      };
    },

    addNodeView() {
      // this lets Tiptap pass the whole node object as a prop automatically
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
          <Button
            data-style="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertContent({
                  type: "score",
                  attrs: {
                    musicXml: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1"><part-name>Music</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>4</duration>
        <type>whole</type>
      </note>
    </measure>
  </part>
</score-partwise>`,
                  },
                })
                .run()
            }
          >
            🎼
          </Button>
        </ToolbarGroup>
      </Toolbar>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
