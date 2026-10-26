import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Clean up the timer and preview URL
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // Reset the input so the same file can be selected again
    event.target.value = "";

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate file size (2 MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be less than or equal to 2 MB.");
      return;
    }

    // Clear previous upload and preview
    clearInterval(timerRef.current);

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setProgress(0);
    setStatus("");
    setError("");
  };

  // Simulate upload progress
  const handleUpload = () => {
    if (!file || status === "uploading") return;

    clearInterval(timerRef.current);

    setProgress(0);
    setStatus("uploading");
    setError("");

    let currentProgress = 0;

    timerRef.current = setInterval(() => {
      currentProgress += 10;

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timerRef.current);
        setStatus("success");
      }
    }, 200);
  };

  // Remove the selected file
  const handleRemove = () => {
    clearInterval(timerRef.current);

    setFile(null);
    setPreview("");
    setProgress(0);
    setStatus("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="app">
      <div className="upload-card">
        <h1>File Upload</h1>

        <p className="subtitle">
          Upload an image up to 2 MB
        </p>

        <div className="upload-area">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Choose an image"
          />

          <p>Choose an image from your device</p>
          <small>Supported files: Images · Maximum size: 2 MB</small>
        </div>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {preview && file && (
          <div className="preview-container">
            <img
              src={preview}
              alt={`Preview of ${file.name}`}
              className="preview-image"
            />

            <div className="file-info">
              <p className="file-name">{file.name}</p>

              <p className="file-size">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

            {status === "uploading" && (
              <div className="progress-container">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p>{progress}% uploaded</p>
              </div>
            )}

            {status === "success" && (
              <p className="success" role="status">
                Image uploaded successfully! (Simulated)
              </p>
            )}

            <div className="actions">
              <button
                type="button"
                onClick={handleUpload}
                disabled={status === "uploading"}
              >
                {status === "success"
                  ? "Upload Again"
                  : status === "uploading"
                  ? "Uploading..."
                  : "Upload Image"}
              </button>

              <button
                type="button"
                className="remove-btn"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;