import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import Results from "./components/Results";
import Timer from "./components/Timer";
import { addPlay } from "./services/play-service";

function App() {
  const boardSizes = {
    easy: [9, 9],
    medium: [16, 16],
    hard: [30, 16],
  };

  const [difficulty, setDifficulty] = useState(getDifficulty());

  const isValidGamePage = ["easy", "medium", "hard"].includes(difficulty);
  const bombCount =
    difficulty === "easy" ? 10 : difficulty === "medium" ? 40 : 99;

  const [seconds, setSeconds] = useState(0);
  const [flagsRemaining, setFlagsRemaining] = useState(bombCount);
  const [playInProgress, setPlayInProgress] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [playComplete, setPlayComplete] = useState(false);
  const [playWon, setPlayWon] = useState(false);
  const [squares, setSquares] = useState([]);
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
    setTimeSubmitted(false);
    setButtonText("Submit Time");
  }

  function endPlay(timerInterval) {
    setPlayInProgress(false);
    setPlayComplete(true);
    clearInterval(timerInterval);
  }

  function resetPlay() {
    setPlayInProgress(false);
    setPlayComplete(false);
    setPlayWon(false);
    resetTimer();
    createBoard(isValidGamePage, boardSizes, difficulty);
    setFlagsRemaining(bombCount);
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

    while (bombLocations.length < bombCount) {
      const xCor = Math.floor(Math.random() * boardSizes[difficulty][0]);
      const yCor = Math.floor(Math.random() * boardSizes[difficulty][1]);
      const bombLocation = [xCor, yCor].toString();
      if (!bombLocations.includes(bombLocation)) {
        bombLocations.push(bombLocation);
      }
    }

    return bombLocations;
  }

  function createSquares() {
    const bombLocations = createBombLocations();

    const emptyRow = new Array(boardSizes[difficulty][0]).fill(null);
    const emptyMatrix = new Array(boardSizes[difficulty][1]).fill(emptyRow);

    const squares = emptyMatrix.map((row, yCor) =>
      row.map((square, xCor) => {
        square = {};
        if (bombLocations.includes([xCor, yCor].toString())) {
          square.hasBomb = true;
        }
        return square;
      })
    );

    return squares;
  }

  function countBombs(squares, horIndex, verIndex) {
    const surroundingLocations = getSurroundingLocations(horIndex, verIndex);
    const bombCount = surroundingLocations.filter(
      (location) => squares[location.yCor][location.xCor].hasBomb
    ).length;

    return bombCount;
  }

  function revealUnflaggedBombs(squares) {
    squares.map((row) => {
      row
        .filter((square) => square.hasBomb && !square.hasFlag)
        .map((square) => (square.isClicked = true));
    });
  }

  function revealFalselyFlaggedSquares(squares) {
    squares.map((row) => {
      row
        .filter((square) => !square.hasBomb && square.hasFlag)
        .map((square) => (square.hasFalseFlag = true));
    });
  }

  function handleSquareClick(horIndex, verIndex, isAutoClick = false) {
    if (playComplete) {
      return;
    }

    let newSquares = [...squares];
    const clickedSquare = newSquares[verIndex][horIndex];

    if (clickedSquare.isClicked || clickedSquare.hasFlag) {
      return;
    }

    clickedSquare.isClicked = true;

    if (clickedSquare.hasBomb) {
      setPlayWon(false);
      endPlay(timerInterval);
      revealUnflaggedBombs(newSquares);
      revealFalselyFlaggedSquares(newSquares);
      setSquares(newSquares);
      return;
    }

    const noHiddenBombRows = newSquares.filter((row) => {
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

    setSquares(newSquares);

    if (countBombs(squares, horIndex, verIndex) === 0) {
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

    let newSquares = [...squares];
    const clickedSquare = newSquares[verIndex][horIndex];

    if (clickedSquare.isClicked) {
      return;
    }

    clickedSquare.hasFlag = !clickedSquare.hasFlag;

    const newFlagsRemaining = clickedSquare.hasFlag
      ? flagsRemaining - 1
      : flagsRemaining + 1;
    setFlagsRemaining(newFlagsRemaining);

    setSquares(newSquares);
  }

  function createBoard(isValidGamePage) {
    if (!isValidGamePage) {
      return;
    }
    const squares = createSquares();

    setSquares(squares);
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
          squares={squares}
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
