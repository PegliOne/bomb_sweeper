import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import GameResults from "./components/GameResults";
import Timer from "./components/Timer";

function App() {
  const bombProbability = 0.125;
  const path = window.location.pathname;
  const difficulty = path === "/" ? "easy" : path.slice(6).toLowerCase();
  const isValidGamePage = ["easy", "medium", "hard"].includes(difficulty);

  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [bombMatrix, setBombMatrix] = useState([]);

  const boardSizes = {
    easy: [9, 9],
    medium: [16, 16],
    hard: [30, 16],
  };

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

  function endGame() {
    setGameOver(true);
  }

  function resetGame() {
    setGameOver(false);
    resetTimer();
    createBoard(isValidGamePage, boardSizes, difficulty);
  }

  function checkValidLocation(location) {
    return (
      location.xCor > -1 &&
      location.xCor < boardSizes[difficulty][0] &&
      location.yCor > -1 &&
      location.yCor < boardSizes[difficulty][1]
    );
  }

  function createBombArray() {
    return Array.from({ length: boardSizes[difficulty][0] }, () =>
      Math.random() < bombProbability
        ? { hasBomb: true, isClicked: false }
        : { hasBomb: false, isClicked: false }
    );
  }

  function countBombs(bombMatrix, horIndex, verIndex) {
    const testLocations = [
      {
        xCor: horIndex - 1,
        yCor: verIndex - 1,
      },
      {
        xCor: horIndex,
        yCor: verIndex - 1,
      },
      {
        xCor: horIndex + 1,
        yCor: verIndex - 1,
      },
      {
        xCor: horIndex - 1,
        yCor: verIndex,
      },
      {
        xCor: horIndex + 1,
        yCor: verIndex,
      },
      {
        xCor: horIndex - 1,
        yCor: verIndex + 1,
      },
      {
        xCor: horIndex,
        yCor: verIndex + 1,
      },
      {
        xCor: horIndex + 1,
        yCor: verIndex + 1,
      },
    ];

    const validTestLocations = testLocations.filter((location) =>
      checkValidLocation(location)
    );
    const bombCount = validTestLocations.filter(
      (location) => bombMatrix[location.yCor][location.xCor].hasBomb
    ).length;

    return bombCount;
  }

  function handleSquareClick(horIndex, verIndex) {
    let newBombMatrix = [...bombMatrix];
    const clickedSquare = newBombMatrix[verIndex][horIndex];
    if (clickedSquare.hasBomb) {
      endGame();
    }
    newBombMatrix[verIndex][horIndex].isClicked = true;
    setBombMatrix(newBombMatrix);
  }

  function createBoard(isValidGamePage, boardSizes, difficulty) {
    if (!isValidGamePage) {
      return;
    }
    const bombMatrix = Array.from({ length: boardSizes[difficulty][1] }, () =>
      createBombArray()
    );
    setBombMatrix(bombMatrix);
  }

  useEffect(() => {
    createBoard(isValidGamePage, boardSizes, difficulty);
  }, []);

  return (
    <div>
      {isValidGamePage && (
        <Board
          difficulty={difficulty}
          bombMatrix={bombMatrix}
          countBombs={countBombs}
          handleSquareClick={handleSquareClick}
          startTimer={startTimer}
        />
      )}
      <div className="results-container">
        {gameOver && <GameResults gameWon={false} />}
      </div>
      <Timer seconds={seconds} resetGame={resetGame} />
    </div>
  );
}

export default App;
