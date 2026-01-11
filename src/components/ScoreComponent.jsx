import { NodeViewWrapper } from "@tiptap/react";
import { useRef, useEffect, useState } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

export default function ScoreComponent(props) {
  const {
    musicXml,
    startMeasure,
    endMeasure,
    zoom: savedZoom,
  } = props.node.attrs;
  const { updateAttributes } = props;

  const editable = props.editor?.isEditable ?? false; // Check if editor is editable
  const containerRef = useRef(null);
  const osmdRef = useRef(null);
  const [zoom, setZoom] = useState(savedZoom || 0.7);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !musicXml) return;

    containerRef.current.innerHTML = "";

    const osmd = new OpenSheetMusicDisplay(containerRef.current, {
      autoResize: false,
      drawTitle: true,
      drawFromMeasureNumber: startMeasure,
      drawUpToMeasureNumber: endMeasure,
    });

    osmdRef.current = osmd;

    osmd.load(musicXml).then(() => {
      osmd.zoom = zoom;
      osmd.render();
    });

    return () => {
      osmdRef.current = null;
    };
  }, [musicXml, startMeasure, endMeasure, renderKey, zoom]);

  return (
    <NodeViewWrapper>
      <div
        style={{
          padding: "1rem",
          background: "#fafafa",
          border: "1px solid #ddd",
          borderRadius: "8px",
          margin: "1rem 0",
        }}
      >
        {/* Only show controls if editable */}
        {editable && (
          <div
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <label>
              Measures:
              <input
                type="number"
                value={startMeasure}
                onChange={(e) =>
                  updateAttributes({
                    startMeasure: parseInt(e.target.value) || 1,
                  })
                }
                style={{ width: "50px", marginLeft: "0.5rem" }}
                min={1}
              />
              {" to "}
              <input
                type="number"
                value={endMeasure}
                onChange={(e) =>
                  updateAttributes({
                    endMeasure: parseInt(e.target.value) || 8,
                  })
                }
                style={{ width: "50px", marginLeft: "0.5rem" }}
                min={1}
              />
            </label>
            <label>
              Zoom:
              <input
                type="range"
                min="0.5"
                max="1.2"
                step="0.05"
                value={zoom}
                onChange={(e) => {
                  const newZoom = parseFloat(e.target.value);
                  setZoom(newZoom);
                  updateAttributes({ zoom: newZoom });
                }}
                onMouseUp={() => setRenderKey((prev) => prev + 1)}
                style={{ marginLeft: "0.5rem" }}
              />
              {Math.round(zoom * 100)}%
            </label>
          </div>
        )}

        {musicXml ? (
          <div ref={containerRef} style={{ width: "100%" }} />
        ) : (
          <p>No score loaded</p>
        )}
      </div>
    </NodeViewWrapper>
  );
}
