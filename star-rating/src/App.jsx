import { useState } from "react";
import "./App.css";

function App() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  const activeRating = hoverRating || rating;

  const handleReset = () => {
    setRating(0);
    setHoverRating(0);
  };

  const getRatingMessage = () => {
    if (rating === 0) return "Please select a rating";
    if (rating <= 2) return "We're sorry to hear that!";
    if (rating === 3) return "Thank you for your feedback!";
    if (rating === 4) return "Glad you liked it!";
    return "Excellent! Thank you! 🎉";
  };

  return (
    <div className="rating-container">
      <h1>Rate Our Product</h1>

      <p className="subtitle">
        How would you rate your experience?
      </p>

      <div className="stars">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${
              star <= activeRating ? "active" : ""
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-pressed={rating === star}
          >
            ★
          </button>
        ))}
      </div>

      <p className="rating-text">
        {rating > 0
          ? `Your rating: ${rating} / 5`
          : "No rating selected"}
      </p>

      <p className="message">{getRatingMessage()}</p>

      <button
        type="button"
        className="reset-btn"
        onClick={handleReset}
      >
        Reset Rating
      </button>
    </div>
  );
}

export default App;