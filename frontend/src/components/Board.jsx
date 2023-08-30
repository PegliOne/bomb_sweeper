import { useEffect, useState } from "react";
import Bomb from "./board-components/Bomb";

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
                  <div key={horIndex}>{ square.hasBomb ? <Bomb /> : countBombs(bombMatrix, horIndex, verIndex) === 0 ? "" : countBombs(bombMatrix, horIndex, verIndex) }</div>
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