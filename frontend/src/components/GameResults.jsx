const GameResults = ({ gameWon }) => {
  console.log(gameWon);
  const results = gameWon
    ? "Congradulations! You Win."
    : "Bomb Clicked. Game Over!";
  return <p className={gameWon ? "results win" : "results lose"}>{results}</p>;
};

export default GameResults;
