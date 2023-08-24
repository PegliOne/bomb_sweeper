import { useEffect, useState } from "react";

const path = window.location.pathname;
const difficulty = path === "/" ? "easy" : path.slice(6).toLowerCase();
const isValidGamePage = ["easy", "medium", "hard"].includes(difficulty);
const bombProbability = 0.125;

const boardSizes = {
  "easy": [9, 9],
  "medium": [16, 16],
  "hard": [30, 16]
}

function checkValidLocation(location) {
  return location.xCor > -1 && location.xCor < boardSizes[difficulty][0] && location.yCor > -1 && location.yCor < boardSizes[difficulty][1];
}

function createBombArray() {
  return Array.from({ length: boardSizes[difficulty][0] }, () => Math.random() < bombProbability ? { hasBomb: true } : { hasBomb: false });
}

function countBombs(bombMatrix, horIndex, verIndex) {
  const testLocations = [
    {
      xCor: horIndex - 1,
      yCor: verIndex - 1
    },
    {
      xCor: horIndex ,
      yCor: verIndex - 1
    },
    {
      xCor: horIndex + 1,
      yCor: verIndex - 1
    },
    {
      xCor: horIndex - 1,
      yCor: verIndex
    },
    {
      xCor: horIndex + 1,
      yCor: verIndex
    },
    {
      xCor: horIndex - 1,
      yCor: verIndex + 1
    },
    {
      xCor: horIndex,
      yCor: verIndex + 1
    },
    {
      xCor: horIndex + 1,
      yCor: verIndex + 1
    },
  ];

  const validTestLocations = testLocations.filter((location) => checkValidLocation(location));
  const bombCount = validTestLocations.filter((location) => bombMatrix[location.yCor][location.xCor].hasBomb).length;

  return bombCount;
}

const Board = () => {
  const [ bombMatrix, setBombMatrix ] = useState([]);

  useEffect(() => {
    if (!isValidGamePage) {
      return;
    }
    const bombMatrix = Array.from({ length: boardSizes[difficulty][1] }, () => createBombArray());
    setBombMatrix(bombMatrix);
  }, [])

  if (isValidGamePage) {
    return (
      <section className={`board ${ difficulty === "hard" ? "large" : ""}`}>
        { bombMatrix.map((row, verIndex) => {
          return (
            <div key={verIndex}>
              { row.map((square, horIndex) => {
                return (
                  <div key={horIndex}>{ square.hasBomb ? <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg> : countBombs(bombMatrix, horIndex, verIndex) === 0 ? "" : countBombs(bombMatrix, horIndex, verIndex) }</div>
                )  
              })}
            </div>
          )
        })}
      </section>
    );
  }
}

export default Board;