import './App.css';
import Board from './components/Board'

function App() {
  return (
    <div>
      <Board/>
      <p class="timer">
        <span>Timer:</span> 00:00
        <button>Reset</button>
        <button>Submit</button>
      </p>
    </div>
  );
}

export default App;
