const BoardSquare = ({ hasBomb }) => {
  return (
    <div>{ hasBomb ? 'B' : '' }</div>
  );
}
 
export default BoardSquare;