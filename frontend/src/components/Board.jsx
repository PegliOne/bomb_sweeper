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
  return Array.from({ length: boardSizes[difficulty][0] }, () => Math.random() < bombProbability ? 'B' : '');
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
      <section className="board">
        { bombMatrix.map((row, index) => {
          return (
            <div key={index}>
              { row.map((square, index) => {
                return (
                  <div key={index}>{square}</div>
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