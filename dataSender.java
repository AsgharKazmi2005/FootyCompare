//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.OutputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
//
//public class dataSender {
//    private static final String API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";
//
//    public static void main(String[] args) {
//        // Simulating receiving player data from an API
//        String playerData = fetchPlayerDataFromAPI();
//
//        // Call the method to send player data to frontend
//        sendPlayerDataToFrontend(playerData);
//    }
//
//    private static String fetchPlayerDataFromAPI() {
//        StringBuilder responseData = new StringBuilder();
//        try {
//            URL apiUrl = new URL(API_URL);
//            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
//            connection.setRequestMethod("GET");
//
//            try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
//                String line;
//                while ((line = reader.readLine()) != null) {
//                    responseData.append(line);
//                }
//            }
//            connection.disconnect();
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.err.println("Error fetching data from API: " + e.getMessage());
//        }
//        return responseData.toString();
//    }
//
//    private static void sendPlayerDataToFrontend(String playerData) {
//        try {
//            // Define the URL of the frontend endpoint to receive player data
//            URL url = new URL("http://localhost:8080/player-data-endpoint");
//
//            // Open connection to the URL
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//
//            // Set the request method to POST
//            connection.setRequestMethod("POST");
//            connection.setRequestProperty("Content-Type", "application/json");
//            connection.setDoOutput(true);
//
//            // Write the player data JSON to the connection output stream
//            try (OutputStream outputStream = connection.getOutputStream()) {
//                outputStream.write(playerData.getBytes());
//            }
//
//            // Get the response code
//            int responseCode = connection.getResponseCode();
//            if (responseCode == HttpURLConnection.HTTP_OK) {
//                // Print a confirmation message if successful
//                System.out.println("Player data sent successfully to frontend.");
//            } else {
//                System.err.println("Failed to send player data to frontend. Response code: " + responseCode);
//            }
//
//            // Disconnect the connection
//            connection.disconnect();
//        } catch (IOException e) {
//            e.printStackTrace(); // Print the full stack trace
//            System.err.println("Error sending player data to frontend: " + e.getMessage());
//        }
//    }
//}