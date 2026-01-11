import { useState } from "react";
import JSZip from "jszip";
import { recognizeMusic } from "../api/api";

export default function ScoreUploadModal({ onClose, onInsert }) {
  const [musicXml, setMusicXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // users can choose to post xml directly or a picture
  const [activeTab, setActiveTab] = useState("file"); // "file" or "image"

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    try {
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
    } catch {
      setError("Failed to read file");
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await recognizeMusic(file);

      if (data.error) {
        throw new Error(data.error);
      }

      setMusicXml(data.musicXml);
    } catch (err) {
      setError(err.message || "Failed to recognize music from image");
    } finally {
      setLoading(false);
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

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveTab("file")}
            style={{
              padding: "0.5rem 1rem",
              background: activeTab === "file" ? "#333" : "#eee",
              color: activeTab === "file" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            📄 MusicXML File
          </button>
          <button
            onClick={() => setActiveTab("image")}
            style={{
              padding: "0.5rem 1rem",
              background: activeTab === "image" ? "#333" : "#eee",
              color: activeTab === "image" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            📷 Image
          </button>
        </div>

        {/* File upload tab */}
        {activeTab === "file" && (
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label>Upload MusicXML file:</label>
            <input
              type="file"
              accept=".xml,.musicxml,.mxl"
              onChange={handleFileUpload}
              style={{
                display: "block",
                marginTop: "0.5rem",
                marginLeft: "4rem",
              }}
            />
          </div>
        )}

        {/* Image upload tab */}
        {activeTab === "image" && (
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label>🧪 Upload an image of sheet music</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageUpload}
              style={{
                display: "block",
                marginTop: "1.5rem",
                marginLeft: "4rem",
              }}
            />
            <p
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "1.5rem" }}
            >
              Works best with clear, printed scores. May take a minute to
              process.
            </p>
          </div>
        )}

        {loading && <p>🎼 Recognizing music... this may take a minute.</p>}
        {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
        {musicXml && <p style={{ color: "green" }}>✅ Score loaded!</p>}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleInsert} disabled={!musicXml || loading}>
            Insert Score
          </button>
        </div>
      </div>
    </div>
  );
}
