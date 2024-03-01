import Bomb from "./board-components/Bomb";

const Board = ({
  difficulty,
  bombMatrix,
  handleSquareClick,
  startTimer,
  countBombs,
  isActive,
}) => {
  return (
    <section
      className={`board ${difficulty === "hard" ? "large" : ""}`}
      onClick={startTimer}
    >
      {bombMatrix.map((row, verIndex) => {
        return (
          <div key={verIndex}>
            {row.map((square, horIndex) => {
              return (
                <div
                  key={horIndex}
                  className={`${!square.isClicked ? "hidden" : ""} ${
                    isActive ? "clickable" : ""
                  }`}
                  onClick={() => handleSquareClick(horIndex, verIndex)}
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
