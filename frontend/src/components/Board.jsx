import Bomb from "./board-components/Bomb";

const Board = ({
  difficulty,
  squares,
  handleSquareClick,
  handleFlagClick,
  countBombs,
  isActive,
}) => {
  function getSquareClass(square) {
    if (square.isClicked) {
      return "";
    } else if (square.hasFalseFlag) {
      return "falsely-flagged";
    } else if (square.hasFlag) {
      return "flagged";
    } else {
      return "hidden";
    }
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
                  className={`${getSquareClass(square)} ${
                    isActive ? "clickable" : ""
                  }`}
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
