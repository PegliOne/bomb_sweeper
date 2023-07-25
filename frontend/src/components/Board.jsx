import BoardRow from "./BoardRow";

const Board = () => {
  if (window.location.pathname === '/') {
    return (
      <section>
        { Array.from({ length: 9 }, (_, i) =>
          <BoardRow/>
        )}
      </section>
    );
  }
}
 
export default Board;