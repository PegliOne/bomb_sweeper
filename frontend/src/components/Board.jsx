import { useEffect, useState } from "react";

function createBombArray() {
  return Array.from({length: 9}, () => Math.random() < 0.2 ? 'B' : '');
}

const Board = () => {
  const [ bombMatrix, setBombMatrix ] = useState([]);

  useEffect(() => {
    const bombMatrix = Array.from({length: 9}, () => createBombArray());
    setBombMatrix(bombMatrix);
  }, [])

  if (['/game/easy', '/game/medium', '/game/hard'].includes(window.location.pathname.toLowerCase())) {
    return (
      <section className="board">
        { bombMatrix.map((row, index) => {
          return (
            <div key={index}>
              { row.map((square, index) => {
                return (
                  <div key={index}>{square} {index}</div>
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