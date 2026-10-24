import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Close the modal when Escape is pressed
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Automatically hide the popup after 3 seconds
  useEffect(() => {
    if (!popupMessage) return;

    const timer = setTimeout(() => {
      setPopupMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [popupMessage]);

  const handleConfirm = () => {
    setIsModalOpen(false);
    setPopupMessage("Action completed successfully!");
  };

  return (
    <div className="app">
      <h1>Modal & Popup Demo</h1>
      <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 id="modal-title">Confirm Action</h2>
            <p>Are you sure you want to continue?</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button className="primary-btn" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup / Toast */}
      {popupMessage && (
        <div className="toast" role="status">
          <span>{popupMessage}</span>
          <button
            onClick={() => setPopupMessage("")}
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
