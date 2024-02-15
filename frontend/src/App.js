import "./App.css";
import Board from "./components/Board";
import GameResults from "./components/GameResults";
import Timer from "./components/Timer";

function App() {
  const gameOver = true;

  return (
    <div>
      <Board />
      <div className="results-container">
        {gameOver && <GameResults gameWon={true} />}
      </div>
      <Timer />
    </div>
  );
}

export default App;
