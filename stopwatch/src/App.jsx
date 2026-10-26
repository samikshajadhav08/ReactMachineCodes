import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const elapsedBeforeStartRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed =
        elapsedBeforeStartRef.current +
        (Date.now() - startTimeRef.current);

      setElapsedTime(elapsed);
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    if (!isRunning) return;

    elapsedBeforeStartRef.current = elapsedTime;
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    elapsedBeforeStartRef.current = 0;
    startTimeRef.current = 0;
  };

  const totalCentiseconds = Math.floor(elapsedTime / 10);
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <div className="stopwatch-container">
      <h1>React Stopwatch</h1>

      <div className="stopwatch-display" role="timer">
        <span>{formatTime(minutes)}</span>
        <span className="separator">:</span>
        <span>{formatTime(seconds)}</span>
        <span className="separator">:</span>
        <span>{formatTime(centiseconds)}</span>
      </div>

      <p className="stopwatch-status" aria-live="polite">
        {isRunning
          ? "Stopwatch Running..."
          : elapsedTime > 0
            ? "Stopwatch Paused"
            : "Ready to Start"}
      </p>

      <div className="stopwatch-buttons">
        <button
          className="start-btn"
          onClick={handleStart}
          disabled={isRunning}
        >
          {elapsedTime > 0 ? "Resume" : "Start"}
        </button>

        <button
          className="pause-btn"
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </button>

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;