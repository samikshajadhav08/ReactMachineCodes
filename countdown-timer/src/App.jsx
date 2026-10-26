import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputSeconds, setInputSeconds] = useState("60");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  // Start, pause, and clean up the countdown interval
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  // Stop the timer when it reaches zero
  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft]);

  const handleStart = () => {
    if (isRunning) return;

    // Restart from the input if the previous countdown finished
    if (timeLeft === 0) {
      const seconds = Number(inputSeconds);

      if (inputSeconds.trim() === "" ||
          !Number.isInteger(seconds) ||
          seconds <= 0) {
        return;
      }

      setTimeLeft(seconds);
    }

    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);

    const seconds = Number(inputSeconds);

    if (
      inputSeconds.trim() !== "" &&
      Number.isInteger(seconds) &&
      seconds > 0
    ) {
      setTimeLeft(seconds);
    } else {
      setTimeLeft(0);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputSeconds(value);

    // Update the displayed time only when the timer is stopped
    if (
      !isRunning &&
      value.trim() !== "" &&
      Number.isInteger(Number(value)) &&
      Number(value) >= 0
    ) {
      setTimeLeft(Number(value));
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const status = isRunning
    ? "Timer Running..."
    : timeLeft === 0
      ? "Time's Up! 🎉"
      : "Timer Paused";

  return (
    <div className="timer-container">
      <h1>Countdown Timer</h1>

      <label htmlFor="duration">Duration (seconds)</label>

      <input
        id="duration"
        type="number"
        min="1"
        step="1"
        value={inputSeconds}
        disabled={isRunning}
        onChange={handleInputChange}
      />

      <div className="timer-display" role="timer" aria-live="off">
        {formattedTime}
      </div>

      <p className="timer-status" aria-live="polite">
        {status}
      </p>

      <div className="timer-buttons">
        <button
          onClick={handleStart}
          disabled={isRunning}
        >
          {timeLeft === 0 ? "Restart" : "Start"}
        </button>

        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;