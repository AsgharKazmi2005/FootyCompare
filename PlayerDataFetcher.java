import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONArray;
import org.json.JSONObject;

public class PlayerDataFetcher {

    public static JSONObject fetchPlayerData(String playerName) {
        try {
            // Construct URL for fetching player data
            String apiUrl = "https://fantasy.premierleague.com/api/bootstrap-static/";
            URL url = new URL(apiUrl);

            // Establish connection
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Read response
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Parse JSON response
            JSONObject jsonResponse = new JSONObject(response.toString());

            // Get elements array from JSON response
            JSONArray elementsArray = jsonResponse.getJSONArray("elements");

            // Iterate through elements to find the player by name
            JSONObject playerData = null;
            for (int i = 0; i < elementsArray.length(); i++) {
                JSONObject element = elementsArray.getJSONObject(i);
                String webName = element.getString("web_name");
                if (webName.equalsIgnoreCase(playerName)) {
                    playerData = element;
                    break;
                }
            }

            return playerData;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}