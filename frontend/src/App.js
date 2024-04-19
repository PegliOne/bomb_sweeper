import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import Results from "./components/Results";
import Timer from "./components/Timer";
import { addPlay } from "./services/play-service";

function App() {
  const bombProbability = 0.125;

  const boardSizes = {
    easy: [9, 9],
    medium: [16, 16],
    hard: [30, 16],
  };

  const [difficulty, setDifficulty] = useState(getDifficulty());

  const isValidGamePage = ["easy", "medium", "hard"].includes(difficulty);
  const initialFlagsCount =
    difficulty === "easy" ? 10 : difficulty === "medium" ? 40 : 99;

  const [seconds, setSeconds] = useState(0);
  const [flagsRemaining, setFlagsRemaining] = useState(initialFlagsCount);
  const [playInProgress, setPlayInProgress] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [playComplete, setPlayComplete] = useState(false);
  const [playWon, setPlayWon] = useState(false);
  const [bombMatrix, setBombMatrix] = useState([]);
  const [buttonText, setButtonText] = useState("Submit Time");
  const [timeSubmitted, setTimeSubmitted] = useState(false);

  function getDifficulty() {
    const path = window.location.pathname;
    return path === "/" ? "medium" : path.slice(6).toLowerCase();
  }

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
    setFlagsRemaining(initialFlagsCount);
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
    setButtonText("Submit Time");
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

  function createBombLocations() {
    let bombLocations = [];

    while (bombLocations.length < initialFlagsCount) {
      const xCor = Math.floor(Math.random() * boardSizes[difficulty][0]);
      const yCor = Math.floor(Math.random() * boardSizes[difficulty][1]);
      const bombLocation = [xCor, yCor].toString();
      bombLocations.push(bombLocation);
    }

    return bombLocations;
  }

  function createBombMatrix() {
    const bombLocations = createBombLocations();

    const emptyRow = new Array(boardSizes[difficulty][0]).fill(null);
    const emptyMatrix = new Array(boardSizes[difficulty][1]).fill(emptyRow);

    const bombMatrix = emptyMatrix.map((row, yCor) =>
      row.map((square, xCor) => {
        square = {};
        if (bombLocations.includes([xCor, yCor].toString())) {
          square.hasBomb = true;
        }
        return square;
      })
    );

    return bombMatrix;
  }

  function countBombs(bombMatrix, horIndex, verIndex) {
    const surroundingLocations = getSurroundingLocations(horIndex, verIndex);
    const bombCount = surroundingLocations.filter(
      (location) => bombMatrix[location.yCor][location.xCor].hasBomb
    ).length;

    return bombCount;
  }

  function revealUnflaggedBombs(bombMatrix) {
    bombMatrix.map((row) => {
      row
        .filter((square) => square.hasBomb && !square.hasFlag)
        .map((square) => (square.isClicked = true));
    });
  }

  function revealFalselyFlaggedSquares(bombMatrix) {
    bombMatrix.map((row) => {
      row
        .filter((square) => !square.hasBomb && square.hasFlag)
        .map((square) => (square.hasFalseFlag = true));
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
      revealUnflaggedBombs(newBombMatrix);
      revealFalselyFlaggedSquares(newBombMatrix);
      setBombMatrix(newBombMatrix);
      return;
    }

    const noHiddenBombRows = newBombMatrix.filter((row) => {
      const noHiddenBombSquares = row.filter(
        (square) => !square.hasBomb && !square.isClicked
      );
      return noHiddenBombSquares.length > 0;
    });

    if (noHiddenBombRows.length < 1) {
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

    const newFlagsRemaining = clickedSquare.hasFlag
      ? flagsRemaining - 1
      : flagsRemaining + 1;
    setFlagsRemaining(newFlagsRemaining);

    setBombMatrix(newBombMatrix);
  }

  function createBoard(isValidGamePage) {
    if (!isValidGamePage) {
      return;
    }
    const bombMatrix = createBombMatrix();

    setBombMatrix(bombMatrix);
  }

  function submitTime(seconds) {
    const play = {
      difficulty: difficulty,
      playWon: true,
      seconds: seconds,
    };
    addPlay(play);
    setButtonText("Time Submitted");
    setTimeSubmitted(true);
  }

  useEffect(() => {
    const newDifficulty = getDifficulty();
    setDifficulty(newDifficulty);
    createBoard(isValidGamePage, boardSizes, newDifficulty);
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
        <div className="flag-counter">
          <span className="flag-image"></span>: {flagsRemaining}
        </div>
        <div className="results-container">
          {playComplete && <Results playWon={playWon} />}
        </div>
        <Timer
          seconds={seconds}
          resetPlay={resetPlay}
          playWon={playWon}
          submitTime={submitTime}
          buttonText={buttonText}
          timeSubmitted={timeSubmitted}
        />
      </div>
    </div>
  );
}

export default App;
