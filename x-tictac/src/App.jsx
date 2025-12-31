import { useState } from "react";
import "./App.css";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const [score, setScore] = useState({
    X: 0,
    O: 0,
    Draws: 0,
  });

  const checkWinner = (b) => {
    for (let [a, b1, c] of WIN_PATTERNS) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setScore((prev) => ({ ...prev, [win]: prev[win] + 1 }));
      return;
    }

    if (newBoard.every(Boolean)) {
      setWinner("Draw");
      setScore((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
      return;
    }

    setIsXTurn(!isXTurn);
  };

  const restartRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
  };

  const resetAll = () => {
    restartRound();
    setScore({ X: 0, O: 0, Draws: 0 });
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>

      <div className="scoreboard">
        <span>X: {score.X}</span>
        <span>Draws: {score.Draws}</span>
        <span>O: {score.O}</span>
      </div>

      <div className="status">
        {winner
          ? winner === "Draw"
            ? "Match Draw"
            : `Winner: ${winner}`
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </div>

      <div className="board">
        {board.map((cell, i) => (
          <button key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </button>
        ))}
      </div>

      <div className="actions">
        <button>Restart Round</button>
        <button onClick={resetAll}>Reset All</button>
      </div>
    </div>
  );
}
