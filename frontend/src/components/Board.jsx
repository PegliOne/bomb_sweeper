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

  if (window.location.pathname === '/') {
    return (
      <section class="board">
        { bombMatrix.map((row) => {
          return (
            <div>
              { row.map((square) => {
                return (
                  <div>{square}</div>
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