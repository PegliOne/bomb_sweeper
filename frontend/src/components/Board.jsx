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
    }

    if (square.hasFalseFlag) {
      return "falsely-flagged";
    }

    return square.hasFlag ? "flagged" : "hidden";
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
                  <span>
                    {square.hasBomb ? (
                      <Bomb />
                    ) : square.hasFalseFlag ? (
                      "X"
                    ) : countBombs(squares, horIndex, verIndex) === 0 ? (
                      ""
                    ) : (
                      countBombs(squares, horIndex, verIndex)
                    )}
                  </span>
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
