import { useState } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handlePlayer1Change = (event) => {
    setPlayer1(event.target.value);
    console.log("Player 1: ", event.target.value);
  };

  const handlePlayer2Change = (event) => {
    setPlayer2(event.target.value);
    console.log("Player 2: ", event.target.value);
  };

  return (
    <div className="main">
      <div className="navbar">
        <h1>FootyCompare</h1>
        <div className="user-input">
          <div>
            <label htmlFor="player1">Player 1: </label>
            <input
              type="text"
              id="player1"
              value={player1}
              onChange={handlePlayer1Change}
            />
          </div>
          <div>
            <label htmlFor="player2">Player 2: </label>
            <input
              type="text"
              id="player2"
              value={player2}
              onChange={handlePlayer2Change}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
