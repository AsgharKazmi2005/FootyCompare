import java.util.Map;
import java.util.HashMap;

public class Defender extends Player {
    private int ownGoals;
    private int goalsConceded;
    private double expectedGoalsConceded;
    private double expectedGoalsConcededPer90;
    private double goalsConcededPer90;
    private double cleanSheetsPer90;

    public Defender(int id, String fullName, int yellowCards, int redCards, String form,
                    double pointsPerGame, int squadNumber, int minutes, int influence,
                    int starts, int ownGoals, int goalsConceded, double expectedGoalsConceded,
                    double expectedGoalsConcededPer90, double goalsConcededPer90, double cleanSheetsPer90) {
        super(id, fullName, yellowCards, redCards, form, pointsPerGame, squadNumber, minutes, influence,
                starts);
        this.ownGoals = ownGoals;
        this.goalsConceded = goalsConceded;
        this.expectedGoalsConceded = expectedGoalsConceded;
        this.expectedGoalsConcededPer90 = expectedGoalsConcededPer90;
        this.goalsConcededPer90 = goalsConcededPer90;
        this.cleanSheetsPer90 = cleanSheetsPer90;
    }

    public double calculateDefenderRating(Map<String, Double> data) {
        // Define weights for each criterion
        Map<Integer, Double> weights = new HashMap<>();
        weights.put((int) cleanSheetsPer90, 0.8);
        weights.put(goalsConceded, -0.3);
        weights.put(this.getRedCards(), -0.2);
        weights.put(this.getYellowCards(), -0.1);
        weights.put(ownGoals, -0.2);

        // Calculate the weighted sum of criteria
        double weightedSum = 0;
        double totalWeight = 0;
        for (Map.Entry<Integer, Double> entry : weights.entrySet()) {
            Integer key = entry.getKey();
            if (data.containsKey(key)) {
                weightedSum += data.get(key) * entry.getValue();
                totalWeight += entry.getValue();
            }
        }

        // Calculate the rating and round it to two decimal points
        double rating = weightedSum / totalWeight;
        return Math.round(rating * 100.0) / 100.0;
    }

    public void printStats() {
        System.out.println("Player Stats:");
        System.out.println("Own Goals: " + ownGoals);
        System.out.println("Goals Conceded: " + goalsConceded);
        System.out.println("Expected Goals Conceded: " + expectedGoalsConceded);
        System.out.println("Expected Goals Conceded Per 90 Minutes: " + expectedGoalsConcededPer90);
        System.out.println("Goals Conceded Per 90 Minutes: " + goalsConcededPer90);
        System.out.println("Clean Sheets Per 90 Minutes: " + cleanSheetsPer90);
    }
}
