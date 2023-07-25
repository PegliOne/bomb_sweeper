import BoardSquare from "./BoardSquare";

const BoardRow = () => {
  return ( 
    <div>
      { Array.from({ length: 9 }, (_, i) =>
        <BoardSquare hasBomb={ Math.random() < 0.125 ? true : false }/>
      )}
    </div>
  );
}
 
export default BoardRow;