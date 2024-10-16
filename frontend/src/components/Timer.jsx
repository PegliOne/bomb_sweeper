const Timer = ({
  seconds,
  resetPlay,
  pausePlay,
  playInProgress,
  playPaused,
  playWon,
  submitTime,
  timeSubmitted,
}) => {
  let submitButtonClass = "";

  if (timeSubmitted) submitButtonClass += "submitted";

  return (
    <section className="timer">
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
      <button onClick={resetPlay}>Reset</button>
      <button className={playInProgress ? "" : "disabled"} onClick={pausePlay}>
        {playPaused ? "Unpause" : "Pause"}
      </button>
      <div className="timer-submit">
        {playWon && (
          <button
            className={submitButtonClass}
            onClick={() => submitTime(seconds)}
          >
            {timeSubmitted ? "Time Submitted" : "Submit Time"}
          </button>
        )}
      </div>
    </section>
  );
};

export default Timer;
