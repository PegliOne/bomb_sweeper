import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import GameResults from "./components/GameResults";
import Timer from "./components/Timer";

function App() {
  const gameOver = true;

  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  function startTimer() {
    if (timerRunning) {
      return;
    }

    setTimerRunning(true);
    const startTime = new Date();

    const timerInterval = setInterval(() => {
      setSeconds(Math.floor((new Date() - startTime) / 1000));
    }, 1000);

    setTimerInterval(timerInterval);
  }

  function resetTimer() {
    if (!timerRunning) {
      return;
    }

    clearInterval(timerInterval);
    setSeconds(0);
    setTimerRunning(false);
  }

  return (
    <div>
      <Board startTimer={startTimer} />
      <div className="results-container">
        {gameOver && <GameResults gameWon={true} />}
      </div>
      <Timer seconds={seconds} resetTimer={resetTimer} />
    </div>
  );
}

export default App;
