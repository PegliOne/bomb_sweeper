import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startTime = new Date();

    setInterval(() => {
      setSeconds(Math.floor((new Date() - startTime) / 1000));
    }, 1000);
  }, []);

  return (
    <p className="timer">
      <span className="timer-text">Timer:</span>
      <span>
        <span className="timer-time">
          {Math.floor(seconds / 60) < 10
            ? "0" + Math.floor(seconds / 60)
            : Math.floor(seconds / 60)}
        </span>
        :
        <span className="timer-time">
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </span>
      </span>
      <button>Reset</button>
      <button>Submit</button>
    </p>
  );
};

export default Timer;
