import Bomb from "./board-components/Bomb";

const Board = ({
  difficulty,
  squares,
  handleSquareClick,
  handleFlagClick,
  countBombs,
  isPaused,
  isActive,
}) => {
  function getDisplayState(square) {
    if (isPaused) {
      return "hidden";
    } else if (square.isClicked) {
      return "";
    } else if (square.hasFalseFlag) {
      return "falsely-flagged";
    } else if (square.hasFlag) {
      return "flagged";
    } else {
      return "hidden";
    }
  }

  function getNumClass(horIndex, verIndex) {
    const surroundingBombCount = countBombs(squares, horIndex, verIndex);
    switch (surroundingBombCount) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
      case 6:
        return "six";
      case 7:
        return "seven";
      case 8:
        return "eight";
    }
  }

  function getSquareClass(square, horIndex, verIndex) {
    const displayState = getDisplayState(square);
    const numClass = getNumClass(horIndex, verIndex);
    return `${displayState} ${numClass} ${isActive ? "clickable" : ""}`;
  }

  function getSquareContent(square, horIndex, verIndex) {
    const surroundingBombCount = countBombs(squares, horIndex, verIndex);
    if (square.hasBomb) {
      return <Bomb />;
    } else if (square.hasFalseFlag) {
      return "X";
    } else if (surroundingBombCount === 0) {
      return "";
    } else {
      return surroundingBombCount;
    }
  }

  return (
    <section className={`board ${difficulty === "hard" ? "large" : ""}`}>
      {squares.map((row, verIndex) => {
        return (
          <div key={verIndex}>
            {row.map((square, horIndex) => {
              return (
                <div
                  key={horIndex}
                  className={getSquareClass(square, horIndex, verIndex)}
                  onClick={() => handleSquareClick(horIndex, verIndex)}
                  onContextMenu={(e) => handleFlagClick(e, horIndex, verIndex)}
                >
                  <span>{getSquareContent(square, horIndex, verIndex)}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default Board;
