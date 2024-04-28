import { useState } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);

  const handlePlayer1Change = async (event) => {
    const playerName = event.target.value;
    setPlayer1(playerName);
    await fetchPlayerData(playerName, setPlayer1Data);
  };

  const handlePlayer2Change = async (event) => {
    const playerName = event.target.value;
    setPlayer2(playerName);
    await fetchPlayerData(playerName, setPlayer2Data);
  };

  const fetchPlayerData = async (playerName, setData) => {
    try {
      const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
      const data = await response.json();
      const player = data.elements.find((element) => element.web_name.toLowerCase() === playerName.toLowerCase());
      if (player) {
        setData({
          playerName: `${player.first_name} ${player.second_name}`,
          form: player.form,
          points_per_game: player.points_per_game,
          squad_number: player.squad_number,
          minutes: player.minutes,
          goals_scored: player.goals_scored,
          assists: player.assists,
          clean_sheets: player.clean_sheets,
          goals_conceded: player.goals_conceded,
          own_goals: player.own_goals,
          penalties_saved: player.penalties_saved,
          penalties_missed: player.penalties_missed,
          yellow_cards: player.yellow_cards,
          red_cards: player.red_cards,
          saves: player.saves,
          influence: player.influence,
          creativity: player.creativity,
          threat: player.threat,
          starts: player.starts,
          expected_goals: player.expected_goals,
          expected_assists: player.expected_assists,
          expected_goal_involvements: player.expected_goal_involvements,
          expected_goals_conceded: player.expected_goals_conceded,
          expected_goals_per_90: player.expected_goals_per_90,
          saves_per_90: player.saves_per_90,
          expected_assists_per_90: player.expected_assists_per_90,
          expected_goal_involvements_per_90: player.expected_goal_involvements_per_90,
          expected_goals_conceded_per_90: player.expected_goals_conceded_per_90,
          goals_conceded_per_90: player.goals_conceded_per_90,
          starts_per_90: player.starts_per_90,
          clean_sheets_per_90: player.clean_sheets_per_90
        });
      } else {
        setData(null);
        console.log("Player not found");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const getPosition = (playerData) => {
    if (playerData.saves > 0) {
      return "Goalkeeper";
    } else if (playerData.expected_goal_involvements_per_90 > 0.5) {
      return "Forward";
    } else if (playerData.expected_goal_involvements_per_90 > 0.25) {
      return "Midfielder";
    } else {
      return "Defender";
    }
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
      <hr></hr>
      <div className="main-cont">
        <div className="player-data">
          <div className="p1">
            <div className="p1title">
              {player1Data && (
                <h1 className="player-name">{player1Data.playerName}</h1>
              )}
            </div>
            <hr></hr>
            <div className="data">
              {player1Data && (
                <p className="position">Position: {getPosition(player1Data)}</p>
              )}
              {player1Data && Object.entries(player1Data).map(([key, value]) => (
                <p key={key}>
                  {key.replace(/_/g, " ")}: {value}
                </p>
              ))}
            </div>
          </div>
          <div className="p2">
            <div className="p2title">
              {player2Data && (
                <h1 className="player-name">{player2Data.playerName}</h1>
              )}
            </div>
            <hr></hr>
            <div className="data">
              {player2Data && (
                <p className="position">Position: {getPosition(player2Data)}</p>
              )}
              {player2Data && Object.entries(player2Data).map(([key, value]) => (
                <p key={key}>
                  {key.replace(/_/g, " ")}: {value}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="graphs"></div>
      </div>
    </div>
  );
}

export default App;
