import { useState, useEffect } from "react";
import "./App.css";
import RadarFunc from "./assets/RadarFunc.jsx";
      // const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");

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
  const [data, setData] = useState([]);

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

  useEffect(() => {
    if (player1Data && player2Data) {
      const newData = [
        {
          subject: 'Attack',
          A: player1Data.AttackerRating,
          B: player2Data.AttackerRating,
          fullMark: 100,
        },
        {
          subject: 'Midfield',
          A: player1Data.MidfielderRating,
          B: player2Data.MidfielderRating,
          fullMark: 100,
        },
        {
          subject: 'Defense',
          A: player1Data.DefenderRating,
          B: player2Data.DefenderRating,
          fullMark: 100,
        },
        {
          subject: 'Goalkeeping',
          A: player1Data.GoalkeeperRating,
          B: player2Data.GoalkeeperRating,
          fullMark: 100,
        },
        {
          subject: 'Form',
          A: player1Data.form*10,
          B: player2Data.form*10,
          fullMark: 100,
        },
        {
          subject: 'Influence',
          A: player1Data.influence/11,
          B: player2Data.influence/11,
          fullMark: 100,
        },
      ];
      setData(newData);
    }
  }, [player1Data, player2Data]);

// Calculate Attacker Stats
function calculateAttackOverall(stats) {
  const { goals_scored, penalties_missed, threat, expected_goals, expected_goal_involvements, expected_goals_per_90, expected_goal_involvements_per_90, minutes } = stats;

  // Define weights for each statistic
  const weights = {
    goals_scored: 1900 / minutes,
    penalties_missed: 500 / minutes,
    threat: 100 / minutes,
    expected_goals: 1500 / minutes,
    expected_goal_involvements: 25 / minutes,
    expected_goals_per_90: 25/ minutes,
    expected_goal_involvements_per_90: 25/ minutes
  };

  // Calculate weighted sum
  const weightedSum = (goals_scored * weights.goals_scored) +
    (penalties_missed * weights.penalties_missed) +
    (threat * weights.threat) +
    (expected_goals * weights.expected_goals) +
    (expected_goal_involvements * weights.expected_goal_involvements) +
    (expected_goals_per_90 * weights.expected_goals_per_90) +
    (expected_goal_involvements_per_90 * weights.expected_goal_involvements_per_90);

  // Normalize the weighted sum to a score from 0 to 100
  const minScore = 0;
  const maxScore = 100;
  const normalizedScore = Math.min(Math.max((weightedSum - minScore) / (maxScore - minScore) * 100, minScore), maxScore);

  // Round the score to two decimal places
  const roundedScore = Math.round(normalizedScore * 100) / 100;

  return roundedScore;
}

function calculateMidfielderOverall(stats) {
  const { assists, creativity, expected_assists, expected_goal_involvements, expected_assists_per_90, expected_goal_involvements_per_90, minutes } = stats;

  // Define weights for each statistic
  const weights = {
    assists: 1000 / minutes,
    creativity: 200 / minutes,
    expected_assists: 1000 / minutes,
    expected_goal_involvements: 50 / minutes,
    expected_assists_per_90: 1000 / minutes,
    expected_goal_involvements_per_90: 50 / minutes
  };

  // Calculate weighted sum
  const weightedSum = (assists * weights.assists) +
    (creativity * weights.creativity) +
    (expected_assists * weights.expected_assists) +
    (expected_goal_involvements * weights.expected_goal_involvements) +
    (expected_assists_per_90 * weights.expected_assists_per_90) +
    (expected_goal_involvements_per_90 * weights.expected_goal_involvements_per_90);

  // Normalize the weighted sum to a score from 0 to 100
  const minScore = 0;
  const maxScore = 100;
  const normalizedScore = Math.min(Math.max((weightedSum - minScore) / (maxScore - minScore) * 100, minScore), maxScore);

  // Round the score to two decimal places
  const roundedScore = Math.round(normalizedScore * 100) / 100;

  return roundedScore;
}


function calculateDefenderOverall(stats, pos) {
  const { clean_sheets, goals_conceded, expected_goals_conceded, own_goals, clean_sheets_per_90, expected_goals_conceded_per_90, goals_conceded_per_90, minutes } = stats;
  let weights;
  if (pos === "Defender") {
    // Define weights for defenders
    weights = {
      clean_sheets: 17000 / minutes,
      goals_conceded: -100 / minutes,
      expected_goals_conceded: -50 / minutes,
      own_goals: -50 / minutes,
      clean_sheets_per_90: 10000 / minutes,
      expected_goals_conceded_per_90: -50 / minutes,
      goals_conceded_per_90: -50 / minutes
    };
  } else {
    // Define default weights for other positions (like attacker or midfielder)
    weights = {
      clean_sheets: 0 / minutes,
      goals_conceded: -0.1 / minutes,
      expected_goals_conceded: -0.1 / minutes,
      own_goals: -0.1 / minutes,
      clean_sheets_per_90: 0 / minutes,
      expected_goals_conceded_per_90: -0.05 / minutes,
      goals_conceded_per_90: -0.05 / minutes
    };
  }

  // Calculate weighted sum
  const weightedSum = (clean_sheets * weights.clean_sheets) +
    (goals_conceded * weights.goals_conceded) +
    (expected_goals_conceded * weights.expected_goals_conceded) +
    (own_goals * weights.own_goals) +
    (clean_sheets_per_90 * weights.clean_sheets_per_90) +
    (expected_goals_conceded_per_90 * weights.expected_goals_conceded_per_90) +
    (goals_conceded_per_90 * weights.goals_conceded_per_90);

  // Normalize the weighted sum to a score from 0 to 100
  const minScore = 0;
  const maxScore = 100;
  const normalizedScore = Math.min(Math.max((weightedSum - minScore) / (maxScore - minScore) * 100, minScore), maxScore);

  // Round the score to two decimal places
  const roundedScore = Math.round(normalizedScore * 100) / 100;

  return roundedScore;
}

// Calculate Goalkeeper Stats
function calculateGoalkeeperOverall(stats, pos) {
  const { penalties_saved, saves, expected_goals_conceded, saves_per_90, expected_goals_conceded_per_90, goals_conceded_per_90, clean_sheets_per_90 } = stats;
  const minutes=stats.minutes
  // Define default weights for non-goalkeeper positions
  const defaultWeights = {
    penalties_saved: 10 / minutes,
    saves: 10 / minutes,
    expected_goals_conceded: -30 / minutes,
    saves_per_90: 10/ minutes,
    expected_goals_conceded_per_90: -30 / minutes,
    goals_conceded_per_90: -0.1 / minutes,
    clean_sheets_per_90: 100000 / minutes
  };

  // Define weights for goalkeeper position
  const goalkeeperWeights = {
    penalties_saved: 50 / minutes,
    saves: 2500 / minutes,
    expected_goals_conceded: -1 / minutes,
    saves_per_90: 200 / minutes,
    expected_goals_conceded_per_90: -0.1 / minutes,
    goals_conceded_per_90: -0.1 / minutes,
    clean_sheets_per_90: 200 / minutes // Adjusted weight for clean sheets
  };


  // Select weights based on position
  const weights = pos === "Goalkeeper" ? goalkeeperWeights : defaultWeights;

  // Calculate weighted sum
  const weightedSum = (penalties_saved * weights.penalties_saved) +
                      (saves * weights.saves) +
                      (expected_goals_conceded * weights.expected_goals_conceded) +
                      (saves_per_90 * weights.saves_per_90) +
                      (expected_goals_conceded_per_90 * weights.expected_goals_conceded_per_90) +
                      (goals_conceded_per_90 * weights.goals_conceded_per_90) +
                      (clean_sheets_per_90 * weights.clean_sheets_per_90);

  // Normalize the weighted sum to a score from 0 to 100
  const minScore = 0;
  const maxScore = 100;
  const normalizedScore = Math.min(Math.max((weightedSum - minScore) / (maxScore - minScore) * 100, minScore), maxScore);

  // Round the score to two decimal places
  const roundedScore = Math.round(normalizedScore * 100) / 100;

  return roundedScore;
}

////////////////////////////////////////////////////////////////////
// Calculate Goalkeeper Rating
const calculateGoalkeeperRating = (data) => {
  // Define weights for each criterion
  const weights = {
    AttackerRating: 0,
    MidfielderRating: 0.1,
    DefenderRating: 0.1,
    GoalkeeperRating: 2.5
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Calculate Goalkeeper Rating
const calculateMidfielderRating = (data) => {
  // Define weights for each criterion
  const weights = {
    AttackerRating: 0.25,
    MidfielderRating: 5,
    DefenderRating: 0.15,
    GoalkeeperRating: 0
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Calculate Goalkeeper Rating
const calculateDefenderRating = (data) => {
  // Define weights for each criterion
  const weights = {
    AttackerRating: .01,
    MidfielderRating: .01,
    DefenderRating: 4,
    GoalkeeperRating: .01
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data) {
      weightedSum += data[key] * weights[key];
      totalWeight += weights[key];
    }
  }

  // Calculate the rating and round it to two decimal points
  const rating = weightedSum / totalWeight;
  return Math.round(rating * 100) / 100;
};

// Calculate Goalkeeper Rating
const calculateForwardRating = (data) => {
  // Define weights for each criterion
  const weights = {
    AttackerRating: 5,
    MidfielderRating: 0.1,
    DefenderRating: 0.01,
    GoalkeeperRating: 0
    // Add more criteria and adjust weights as needed
  };

  // Calculate the weighted sum of criteria
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key in weights) {
    if (key in data) {
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
      const response = await fetch("http://localhost:8080/data");
      const data = await response.json();
      const player = data.elements.find((element) => element.web_name.toLowerCase() === playerName.toLowerCase());
      if (player) {
        setData({
          playerName: `${player.first_name} ${player.second_name}`,
          form: player.form,
          points_per_game: player.points_per_game,
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
          clean_sheets_per_90: player.clean_sheets_per_90,
          photo: `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.code}.png`,
          AttackerRating: calculateAttackOverall(player, getPosition(player)),
          MidfielderRating: calculateMidfielderOverall(player, getPosition(player)),
          DefenderRating: calculateDefenderOverall(player, getPosition(player)),
          GoalkeeperRating: calculateGoalkeeperOverall(player, getPosition(player)),
          position: getPosition(player)
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
    if (playerData.saves) {
      return "Goalkeeper";
    } else if (playerData.AttackerRating>=playerData.MidfielderRating && playerData.AttackerRating>=playerData.DefenderRating) {
      return "Forward";
    } else if (playerData.MidfielderRating >= playerData.DefenderRating) {
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
              <div className="info-cont">
                <img className="player-pic" src={player1Data.photo}></img>
                <div className="important-data">
                  <h1 className="player-name">{player1Data.playerName}</h1>
                  <p className={`position ${getPosition(player1Data).toLowerCase()}-title`}>Position: {getPosition(player1Data)}</p>
                  <p>Rating: {calculatePlayerRating(player1Data)}</p>
                </div>
              </div>
              )}
            </div>
            <hr></hr>
            <div className="data">
              {player1Data && (
                <>
                  {showGeneral && (
                    <div className="group general-stats">
                      {Object.entries(player1Data).map(([key, value]) => (
                        !(defenderStatsOrder.includes(key) ||
                          forwardStatsOrder.includes(key) ||
                          midfielderStatsOrder.includes(key) ||
                          goalkeeperStatsOrder.includes(key) || key=='playerName' || key=='photo' || key=='position') && (
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
                </>
              )}
            </div>
          </div>
          <div className={`p2 ${showGeneral || showMidfielder || showForward || showDefender || showGoalkeeper ? "" : "hidden"}`}>

            <div className="p2title">
              {player2Data && (
               <div className="info-cont-alt">
                <img className="player-pic" src={player2Data.photo}></img>
                <div className="important-data">
                  <h1 className="player-name">{player2Data.playerName}</h1>
                  <p className={`position ${getPosition(player2Data).toLowerCase()}-title`}>Position: {getPosition(player2Data)}</p>
                  <p>Rating: {calculatePlayerRating(player2Data)}</p>
                </div>
               </div>              )}
            </div>
            <hr></hr>
            <div className="data">
              {player2Data && (
                <>
                  {showGeneral && (
                    <div className="group general-stats">
                      {Object.entries(player2Data).map(([key, value]) => (
                        !(defenderStatsOrder.includes(key) ||
                          forwardStatsOrder.includes(key) ||
                          midfielderStatsOrder.includes(key) ||
                          goalkeeperStatsOrder.includes(key) || key=='playerName' || key=='photo' || key=='position') && (
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="graphs">
      
      <h2 className="radial">Radial Comparison</h2>
      <div className="holder">
      {player1Data && player2Data && (
          <RadarFunc d={data} p1={player1Data} p2={player2Data}></RadarFunc>
      )}
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
