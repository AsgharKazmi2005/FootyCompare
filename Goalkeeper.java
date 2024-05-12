//public class Goalkeeper extends Player {
//    public Goalkeeper(int id, String fullName, int goalsScored, int assists, int yellowCards, int redCards, int saves,
//                    int penaltiesScored, int penaltiesMissed, int ownGoals, int penaltiesSaved, String form,
//                    double pointsPerGame, int squadNumber, int minutes, int cleanSheets, int goalsConceded,
//                    int influence, int creativity, int threat, int starts, double expectedGoals,
//                    double expectedAssists, double expectedGoalInvolvements, double expectedGoalsConceded,
//                    double expectedGoalsPer90, double savesPer90, double expectedAssistsPer90,
//                    double expectedGoalInvolvementsPer90, double expectedGoalsConcededPer90,
//                    double goalsConcededPer90, double startsPer90, double cleanSheetsPer90){
//        super(id, fullName, 0, 0, yellowCards, redCards, saves, 0, 0,
//                0, penaltiesSaved, form, pointsPerGame, squadNumber, minutes, cleanSheets, goalsConceded,
//                influence, 0, 0, starts, 0, 0, 0,
//                expectedGoalsConceded, 0, savesPer90, 0,
//                0, expectedGoalsConcededPer90, goalsConcededPer90, startsPer90,
//                cleanSheetsPer90);
//    }
//}

import java.util.Map;
import java.util.HashMap;
public class Goalkeeper extends Player {
    private int saves;
    private int penaltiesSaved;
    private int goalsConceded;
    private double expectedGoalsConcededPer90;
    private double goalsConcededPer90;
    private double cleanSheetsPer90;


    public Goalkeeper(int id, String fullName, int yellowCards, int redCards, String form,
                      double pointsPerGame, int squadNumber, int minutes, int influence,
                      int starts, int saves, int penaltiesSaved, int goalsConceded, double expectedGoalsConcededPer90, double goalsConcededPer90, double cleanSheetsPer90) {
        super(id, fullName, yellowCards, redCards, form, pointsPerGame, squadNumber, minutes, influence, starts);
        this.saves = saves;
        this.penaltiesSaved = penaltiesSaved;
        this.goalsConceded = goalsConceded;
        this.expectedGoalsConcededPer90 = expectedGoalsConcededPer90;
        this.goalsConcededPer90 = goalsConcededPer90;
        this.cleanSheetsPer90 = cleanSheetsPer90;
    }

    public double calculateGoalkeeperRating(Map<String, Double> data) {
        // Define weights for each criterion
        Map<Integer, Double> weights = new HashMap<>();
        weights.put((int) cleanSheetsPer90, 0.3);
        weights.put(saves, 0.2);
        weights.put(goalsConceded, -0.2);
        weights.put(penaltiesSaved, 0.1);
        weights.put(this.getYellowCards(), -0.1);
        weights.put(this.getRedCards(), -0.2);

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

    public int getSaves() {
        return saves;
    }

    public int getPenaltiesSaved() {
        return penaltiesSaved;
    }

    public int getGoalsConceded() {
        return goalsConceded;
    }

    public double getExpectedGoalsConcededPer90() {
        return expectedGoalsConcededPer90;
    }

    public double getGoalsConcededPer90() {
        return goalsConcededPer90;
    }

    public double getCleanSheetsPer90() {
        return cleanSheetsPer90;
    }

    public void printStats() {
        System.out.println("Goalkeeper Stats:");
        System.out.println("Saves: " + saves);
        System.out.println("Penalties Saved: " + penaltiesSaved);
        System.out.println("Goals Conceded: " + goalsConceded);
        System.out.println("Expected Goals Conceded Per 90 Minutes: " + expectedGoalsConcededPer90);
        System.out.println("Goals Conceded Per 90 Minutes: " + goalsConcededPer90);
        System.out.println("Clean Sheets Per 90 Minutes: " + cleanSheetsPer90);

        // Printing inherited stats
        System.out.println("Player Stats:");
        System.out.println("Yellow Cards: " + getYellowCards());
        System.out.println("Red Cards: " + getRedCards());
        System.out.println("Form: " + getForm());
        System.out.println("Points Per Game: " + getPointsPerGame());
        System.out.println("Squad Number: " + getSquadNumber());
        System.out.println("Minutes: " + getMinutes());
        System.out.println("Influence: " + getInfluence());
        System.out.println("Starts: " + getStarts());
    }
}