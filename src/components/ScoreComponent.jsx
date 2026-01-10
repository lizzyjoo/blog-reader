import { useRef, useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

export default function ScoreComponent(props) {
  const { musicXml } = props.node.attrs;
  const containerRef = useRef(null);

  useEffect(() => {
    // if no musicxml or osmd container
    if (!containerRef.current || !musicXml) return;

    const osmd = new OpenSheetMusicDisplay(containerRef.current);
    osmd.load(musicXml).then(() => {
      osmd.render();
    });
  }, [musicXml]);
  return (
    <NodeViewWrapper className="react-component">
      <div
        style={{
          padding: "1rem",
          background: "#f0f0f0",
          border: "1px solid #ccc",
        }}
      >
        {musicXml ? <div ref={containerRef} /> : <p>No score loaded</p>}
        <br />
        Has musicXml: {musicXml ? "yes" : "no"}
      </div>
    </NodeViewWrapper>
  );
}
