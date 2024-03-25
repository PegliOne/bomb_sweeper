import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import Results from "./components/Results";
import Timer from "./components/Timer";
import { addPlay } from "./services/play-service";

function App() {
  const bombProbability = 0.125;
  const path = window.location.pathname;
  const difficulty = path === "/" ? "easy" : path.slice(6).toLowerCase();
  const isValidGamePage = ["easy", "medium", "hard"].includes(difficulty);

  const [seconds, setSeconds] = useState(0);
  const [playInProgress, setPlayInProgress] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [playComplete, setPlayComplete] = useState(false);
  const [playWon, setPlayWon] = useState(false);
  const [bombMatrix, setBombMatrix] = useState([]);

  const boardSizes = {
    easy: [9, 9],
    medium: [16, 16],
    hard: [30, 16],
  };

  function startTimer() {
    const startTime = new Date();

    const timerInterval = setInterval(() => {
      setSeconds(Math.floor((new Date() - startTime) / 1000));
    }, 1000);

    setTimerInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setPlayInProgress(false);
    setSeconds(0);
  }

  function endPlay(timerInterval) {
    setPlayInProgress(false);
    setPlayComplete(true);
    clearInterval(timerInterval);
  }

  function resetPlay() {
    setPlayInProgress(false);
    setPlayComplete(false);
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

  function getSurroundingLocations(horIndex, verIndex) {
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

    return testLocations.filter((location) => checkValidLocation(location));
  }

  function createBombArray() {
    return Array.from({ length: boardSizes[difficulty][0] }, () =>
      Math.random() < bombProbability
        ? { hasBomb: true, isClicked: false }
        : { hasBomb: false, isClicked: false }
    );
  }

  function countBombs(bombMatrix, horIndex, verIndex) {
    const surroundingLocations = getSurroundingLocations(horIndex, verIndex);
    const bombCount = surroundingLocations.filter(
      (location) => bombMatrix[location.yCor][location.xCor].hasBomb
    ).length;

    return bombCount;
  }

  function revealAllBombs(bombMatrix) {
    bombMatrix.map((row) => {
      row
        .filter((square) => square.hasBomb)
        .map((square) => (square.isClicked = true));
    });
  }

  function handleSquareClick(horIndex, verIndex, isAutoClick = false) {
    if (playComplete) {
      return;
    }

    let newBombMatrix = [...bombMatrix];
    const clickedSquare = newBombMatrix[verIndex][horIndex];

    if (clickedSquare.isClicked || clickedSquare.hasFlag) {
      return;
    }

    clickedSquare.isClicked = true;

    if (clickedSquare.hasBomb) {
      setPlayWon(false);
      endPlay(timerInterval);
      revealAllBombs(newBombMatrix);
      setBombMatrix(newBombMatrix);
      return;
    }

    const noBombRows = newBombMatrix.filter((row) => {
      const noBombSquares = row.filter(
        (square) => !square.hasBomb && !square.isClicked
      );
      return noBombSquares.length > 0;
    });

    if (noBombRows.length < 1) {
      setPlayWon(true);
      endPlay(timerInterval);
      return;
    }

    if (!playInProgress && !isAutoClick) {
      startTimer();
      setPlayInProgress(true);
    }

    setBombMatrix(newBombMatrix);

    if (countBombs(bombMatrix, horIndex, verIndex) === 0) {
      const surroundingLocations = getSurroundingLocations(horIndex, verIndex);
      surroundingLocations.forEach((location) =>
        handleSquareClick(location.xCor, location.yCor, true)
      );
    }
  }

  function handleFlagClick(e, horIndex, verIndex) {
    e.preventDefault();

    if (playComplete) {
      return;
    }

    let newBombMatrix = [...bombMatrix];
    const clickedSquare = newBombMatrix[verIndex][horIndex];

    if (clickedSquare.isClicked) {
      return;
    }

    clickedSquare.hasFlag = !clickedSquare.hasFlag;

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

  function submitTime(seconds) {
    const play = {
      difficulty: difficulty,
      playWon: true,
      seconds: seconds,
    };
    addPlay(play);
  }

  useEffect(() => {
    createBoard(isValidGamePage, boardSizes, difficulty);
  }, []);

  if (!isValidGamePage) {
    return;
  }

  return (
    <div>
      <div className="game-container">
        <Board
          difficulty={difficulty}
          bombMatrix={bombMatrix}
          countBombs={countBombs}
          handleSquareClick={handleSquareClick}
          handleFlagClick={handleFlagClick}
          isActive={!playComplete}
        />
        <div className="results-container">
          {playComplete && <Results playWon={playWon} />}
        </div>
        <Timer
          seconds={seconds}
          resetPlay={resetPlay}
          playWon={playWon}
          submitTime={submitTime}
        />
      </div>
    </div>
  );
}

export default App;
