import org.json.JSONObject;

public class main {
    public static void main(String[] args) {
        JSONObject data = PlayerDataFetcher.fetchPlayerData("Foden");
        System.out.println(data);

        // Extract data from JSON
        int id = data.getInt("id");
        String fullName = data.getString("first_name") + " " + data.getString("second_name");
        int goalsScored = data.getInt("goals_scored");
        int assists = data.getInt("assists");
        int yellowCards = data.getInt("yellow_cards");
        int redCards = data.getInt("red_cards");
        int saves = data.getInt("saves");
        int penaltiesScored = data.getInt("penalties_missed"); // Assuming this field represents penalties scored
        int penaltiesMissed = data.getInt("penalties_missed");
        int ownGoals = data.getInt("own_goals");
        int penaltiesSaved = data.getInt("penalties_saved");
        //Sprint 2 - Get Position

        // Create Player object
        Player p1 = new Player(id, fullName, goalsScored, assists, yellowCards, redCards, saves, penaltiesScored, penaltiesMissed, ownGoals, penaltiesSaved);
    }
}