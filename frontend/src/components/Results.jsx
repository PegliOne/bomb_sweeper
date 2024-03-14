const Results = ({ playWon }) => {
  const results = playWon
    ? "Congradulations! You Win."
    : "Bomb Clicked. Game Over!";
  return <p className={playWon ? "results win" : "results lose"}>{results}</p>;
};

export default Results;
