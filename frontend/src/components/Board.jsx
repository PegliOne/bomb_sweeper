import Bomb from "./board-components/Bomb";

const Board = ({
  difficulty,
  bombMatrix,
  handleSquareClick,
  handleFlagClick,
  countBombs,
  isActive,
}) => {
  function getSquareClass(square) {
    if (square.isClicked) {
      return "";
    }

    return square.hasFlag ? "flagged" : "hidden";
  }

  return (
    <section className={`board ${difficulty === "hard" ? "large" : ""}`}>
      {bombMatrix.map((row, verIndex) => {
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
                    ) : countBombs(bombMatrix, horIndex, verIndex) === 0 ? (
                      ""
                    ) : (
                      countBombs(bombMatrix, horIndex, verIndex)
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
