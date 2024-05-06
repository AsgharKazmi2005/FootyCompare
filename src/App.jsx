import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);
  const [showGeneral, setShowGeneral] = useState(true);
  const [showMidfielder, setShowMidfielder] = useState(false);
  const [showForward, setShowForward] = useState(false);
  const [showDefender, setShowDefender] = useState(false);
  const [showGoalkeeper, setShowGoalkeeper] = useState(false);

  useEffect(() => {
    if (player1Data && player2Data) {
      const position1 = getPosition(player1Data);
      const position2 = getPosition(player2Data);
      
      setShowGeneral(true);
      setShowMidfielder(position1 === "Midfielder" || position2 === "Midfielder");
      setShowForward(position1 === "Forward" || position2 === "Forward");
      setShowDefender(position1 === "Defender" || position2 === "Defender");
      setShowGoalkeeper(position1 === "Goalkeeper" || position2 === "Goalkeeper");
    }
  }, [player1Data, player2Data]);

// Rating function for goalkeepers
const calculateGoalkeeperRating = (data) => {
  // Define weights for each criterion
  const weights = {
    clean_sheets: 0.3,
    saves: 0.2,
    goals_conceded: -0.2,
    penalties_saved: 0.1,
    yellow_cards: -0.1,
    red_cards: -0.2
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data && data[key] !== undefined) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Rating function for defenders
const calculateDefenderRating = (data) => {
  // Define weights for each criterion
  const weights = {
    clean_sheets: 0.2,
    goals_conceded: -0.3,
    assists: 0.2,
    yellow_cards: -0.1,
    red_cards: -0.2
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data && data[key] !== undefined) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Rating function for midfielders
const calculateMidfielderRating = (data) => {
  // Define weights for each criterion
  const weights = {
    assists: 0.3,
    goals_scored: 0.3,
    clean_sheets: 0.1,
    yellow_cards: -0.1,
    red_cards: -0.2
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data && data[key] !== undefined) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Rating function for forwards
const calculateForwardRating = (data) => {
  // Define weights for each criterion
  const weights = {
    goals_scored: 0.4,
    assists: 0.2,
    clean_sheets: 0.1,
    yellow_cards: -0.1,
    red_cards: -0.2
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data && data[key] !== undefined) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};


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

  const toggleShowGeneral = () => {
    setShowGeneral(!showGeneral);
  };

  const toggleShowMidfielder = () => {
    setShowMidfielder(!showMidfielder);
  };

  const toggleShowForward = () => {
    setShowForward(!showForward);
  };

  const toggleShowDefender = () => {
    setShowDefender(!showDefender);
  };

  const toggleShowGoalkeeper = () => {
    setShowGoalkeeper(!showGoalkeeper);
  };

  const defenderStatsOrder = [
    'clean_sheets',
    'goals_conceded',
    'expected_goals_conceded',
    'own_goals',
    'clean_sheets_per_90',
    'expected_goals_conceded_per_90',
    'goals_conceded_per_90'
  ];

  const forwardStatsOrder = [
    'goals_scored',
    'penalties_missed',
    'threat',
    'expected_goals',
    'expected_goal_involvements',
    'expected_goals_per_90',
    'expected_goal_involvements_per_90'
  ];

  const midfielderStatsOrder = [
    'assists',
    'creativity',
    'expected_assists',
    'expected_goal_involvements',
    'expected_assists_per_90',
    'expected_goal_involvements_per_90'
  ];

  const goalkeeperStatsOrder = [
    'penalties_saved',
    'saves',
    'expected_goals_conceded',
    'saves_per_90',
    'expected_goals_conceded_per_90',
    'goals_conceded_per_90',
    'clean_sheets_per_90'
  ];

  const calculatePlayerRating = (playerData) => {
    const position = getPosition(playerData);
    switch (position) {
      case "Goalkeeper":
        return calculateGoalkeeperRating(playerData);
      case "Defender":
        return calculateDefenderRating(playerData);
      case "Midfielder":
        return calculateMidfielderRating(playerData);
      case "Forward":
        return calculateForwardRating(playerData);
      default:
        return 0;
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
      <div className="buttons-players">
        <div className="buttons">
  <button
    className={showGeneral ? "button general active" : "button general"}
    onClick={toggleShowGeneral}
  >
    General
  </button>
  <button
    className={showMidfielder ? "button midfielder active" : "button midfielder"}
    onClick={toggleShowMidfielder}
  >
    Midfielder
  </button>
  <button
    className={showForward ? "button forward active" : "button forward"}
    onClick={toggleShowForward}
  >
    Forward
  </button>
  <button
    className={showDefender ? "button defender active" : "button defender"}
    onClick={toggleShowDefender}
  >
    Defender
  </button>
  <button
    className={showGoalkeeper ? "button goalkeeper active" : "button goalkeeper"}
    onClick={toggleShowGoalkeeper}
  >
    Goalkeeper
  </button>
</div>
        <div className={`player-data ${showGeneral || showMidfielder || showForward || showDefender || showGoalkeeper ? "" : "hidden"}`}>
          <div className={`p1 ${showGeneral || showMidfielder || showForward || showDefender || showGoalkeeper ? "" : "hidden"}`}>
            <div className="p1title">
              {player1Data && (
                <h1 className="player-name">{player1Data.playerName}</h1>
              )}
            </div>
            <hr></hr>
            <div className="data">
              {player1Data && (
                <>
                  <p className={`position ${getPosition(player1Data).toLowerCase()}-title`}>Position: {getPosition(player1Data)}</p>
                  {showGeneral && (
                    <div className="group general-stats">
                      {Object.entries(player1Data).map(([key, value]) => (
                        !(defenderStatsOrder.includes(key) ||
                          forwardStatsOrder.includes(key) ||
                          midfielderStatsOrder.includes(key) ||
                          goalkeeperStatsOrder.includes(key)) && (
                          <div key={key} className="stat">
                            <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                            <p className="stat-value">{value}</p>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  {showMidfielder && (
                    <div className="group midfielder-stats">
                      {midfielderStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player1Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showForward && (
                    <div className="group forward-stats">
                      {forwardStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player1Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showDefender && (
                    <div className="group defender-stats">
                      {defenderStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player1Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showGoalkeeper && (
                    <div className="group goalkeeper-stats">
                      {goalkeeperStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player1Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {<p>Rating: {calculatePlayerRating(player1Data)}</p>}
                </>
              )}
            </div>
          </div>
          <div className={`p2 ${showGeneral || showMidfielder || showForward || showDefender || showGoalkeeper ? "" : "hidden"}`}>

            <div className="p2title">
              {player2Data && (
                <h1 className="player-name">{player2Data.playerName}</h1>
              )}
            </div>
            <hr></hr>
            <div className="data">
              {player2Data && (
                <>
                  <p className={`position ${getPosition(player2Data).toLowerCase()}-title`}>Position: {getPosition(player2Data)}</p>
                  {showGeneral && (
                    <div className="group general-stats">
                      {Object.entries(player2Data).map(([key, value]) => (
                        !(defenderStatsOrder.includes(key) ||
                          forwardStatsOrder.includes(key) ||
                          midfielderStatsOrder.includes(key) ||
                          goalkeeperStatsOrder.includes(key)) && (
                          <div key={key} className="stat">
                            <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                            <p className="stat-value">{value}</p>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  {showMidfielder && (
                    <div className="group midfielder-stats">
                      {midfielderStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player2Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showForward && (
                    <div className="group forward-stats">
                      {forwardStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player2Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showDefender && (
                    <div className="group defender-stats">
                      {defenderStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player2Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {showGoalkeeper && (
                    <div className="group goalkeeper-stats">
                      {goalkeeperStatsOrder.map(key => (
                        <div key={key} className="stat">
                          <p className="stat-key">{key.replace(/_/g, " ")}:&nbsp;</p>
                          <p className="stat-value">{player2Data[key]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {<p>Rating: {calculatePlayerRating(player2Data)}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="graphs"></div>
      </div>
    </div>
  );
}

export default App;
