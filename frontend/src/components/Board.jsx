import { useEffect, useState } from "react";

// Simplify difficulty and board size selection logic

const boardSizes = {
  '/': [9, 9],
  '/game/easy': [9, 9],
  '/game/medium': [16, 16],
  '/game/hard': [30, 16]
}

function getBoardSize(path) {
  return boardSizes[path];
}

function createBombArray() {
  return Array.from({ length: getBoardSize(window.location.pathname.toLocaleLowerCase())[0] }, () => Math.random() < 0.2 ? 'B' : '');
}

const Board = () => {
  const [ bombMatrix, setBombMatrix ] = useState([]);

  useEffect(() => {
    if (!['/', '/game/easy', '/game/medium', '/game/hard'].includes(window.location.pathname.toLowerCase())) {
      return;
    }
    const bombMatrix = Array.from({ length: getBoardSize(window.location.pathname.toLocaleLowerCase())[1] }, () => createBombArray());
    setBombMatrix(bombMatrix);
  }, [])

  if (['/', '/game/easy', '/game/medium', '/game/hard'].includes(window.location.pathname.toLowerCase())) {
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