import { useState } from "react";
import JSZip from "jszip";

export default function ScoreUploadModal({ onClose, onInsert }) {
  const [musicXml, setMusicXml] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".mxl")) {
      // Compressed MusicXML - need to unzip
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      // Find the .xml file inside the zip
      const xmlFile = Object.keys(contents.files).find(
        (name) => name.endsWith(".xml") && !name.startsWith("META-INF")
      );

      if (xmlFile) {
        const text = await contents.files[xmlFile].async("text");
        setMusicXml(text);
      }
    } else {
      // Regular .xml or .musicxml
      const text = await file.text();
      setMusicXml(text);
    }
  };

  const handleInsert = () => {
    if (musicXml) {
      onInsert(musicXml);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "400px",
        }}
      >
        <h2>Add Score</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Upload MusicXML file:</label>
          <input
            type="file"
            accept=".xml,.musicxml,.mxl"
            onChange={handleFileUpload}
            style={{
              border: "2px solid red",
              padding: "10px",
              display: "block",
            }}
          />
        </div>

        {musicXml && <p>✅ File loaded</p>}

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleInsert} disabled={!musicXml}>
            Insert Score
          </button>
        </div>
      </div>
    </div>
  );
}
