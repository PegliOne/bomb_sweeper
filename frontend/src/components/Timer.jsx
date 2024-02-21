const Timer = ({ seconds, resetGame }) => {
  return (
    <p className="timer">
      <span className="timer-text">Timer:</span>
      <span>
        <span className="timer-time">
          {Math.floor(seconds / 60) < 10
            ? "0" + Math.floor(seconds / 60)
            : Math.floor(seconds / 60)}
        </span>
        :
        <span className="timer-time">
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </span>
      </span>
      <button onClick={resetGame}>Reset</button>
      <button>Submit</button>
    </p>
  );
};

export default Timer;
