import { useEffect, useState } from "react";

const path = window.location.pathname;
const difficulty = path === '/' ? 'easy' : path.slice(6).toLowerCase();
const isValidGamePage = ['easy', 'medium', 'hard'].includes(difficulty);
const bombProbability = 0.125;

const boardSizes = {
  'easy': [9, 9],
  'medium': [16, 16],
  'hard': [30, 16]
}

function createBombArray() {
  return Array.from({ length: boardSizes[difficulty][0] }, () => Math.random() < bombProbability ? { hasBomb: true } : { hasBomb: false });
}

function checkIfNextToBomb(bombMatrix, horIndex, verIndex) {
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
  const validTestLocations = testLocations.filter((location) => location.xCor > -1 && location.xCor < boardSizes[difficulty][0] && location.yCor > -1 && location.yCor < boardSizes[difficulty][1]);
  const nextToBomb = !validTestLocations.every((location) => !bombMatrix[location.yCor][location.xCor].hasBomb);
  return nextToBomb;
}

function renderSquare(square) {
  return square.hasBomb ? 'B' : '';
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
      <section className={`board ${ difficulty === 'hard' ? 'large' : ''}`}>
        { bombMatrix.map((row, verIndex) => {
          return (
            <div key={verIndex}>
              { row.map((square, horIndex) => {
                return (
                  <div key={horIndex}>{ square.hasBomb ? 'B' : checkIfNextToBomb(bombMatrix, horIndex, verIndex) ? 'N' : '' }</div>
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