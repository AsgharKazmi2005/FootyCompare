//imports
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.net.InetSocketAddress;

//Server that acts as an API for the front-end
public class Server {
    public static void main(String[] args) {
        // Create Server at localhost port 8080 and store the API data at /data. The front-end will access this.
        try {
            //Create Server at port 8080 using HttpServer
            HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

            // Define API endpoints to send data
            server.createContext("/data", (exchange -> {
                String apiData=fetchDataFromAPI();
                sendResponse(exchange, 200, apiData);
            }));

            // Enable CORS so we can connect our localhost ports
            server.createContext("/", (exchange -> {
                // Set CORS headers to allow requests from any origin
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
                exchange.sendResponseHeaders(204, -1);
            }));

            // Start the server and log it to the console
            server.start();
            System.out.println("Server started at http://localhost:8080/");
            // Catch any errors
        } catch (IOException e) {
            System.out.println(e);
        }
    }
    private static String fetchDataFromAPI() {
        StringBuilder responseData = new StringBuilder();
        try {
            URL apiUrl = new URL("https://fantasy.premierleague.com/api/bootstrap-static/");
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        responseData.append(line);
                    }
                }
            } else {
                System.err.println("Failed to fetch data from API. Response code: " + responseCode);
            }
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Error fetching data from API: " + e.getMessage());
        }
        return responseData.toString();
    }


    // Helper method to send HTTP response with specified status code and body
    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}