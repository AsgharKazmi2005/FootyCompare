//public class Forward extends Player {
//    public Forward(int id, String fullName, int goalsScored, int assists, int yellowCards, int redCards, int saves,
//                   int penaltiesScored, int penaltiesMissed, int ownGoals, int penaltiesSaved, String form,
//                   double pointsPerGame, int squadNumber, int minutes, int cleanSheets, int goalsConceded,
//                   int influence, int creativity, int threat, int starts, double expectedGoals,
//                   double expectedAssists, double expectedGoalInvolvements, double expectedGoalsConceded,
//                   double expectedGoalsPer90, double savesPer90, double expectedAssistsPer90,
//                   double expectedGoalInvolvementsPer90, double expectedGoalsConcededPer90,
//                   double goalsConcededPer90, double startsPer90, double cleanSheetsPer90) {
//        super(id, fullName, goalsScored, assists, yellowCards, redCards, 0, penaltiesScored, penaltiesMissed,
//                0, 0, form, pointsPerGame, squadNumber, minutes, cleanSheets, 0,
//                influence, 0, threat, starts, expectedGoals, expectedAssists, expectedGoalInvolvements,
//                0, expectedGoalsPer90, 0, expectedAssistsPer90,
//                expectedGoalInvolvementsPer90, 0, 0, startsPer90,
//                0);
//    }
//}


import java.util.Map;
import java.util.HashMap;
public class Forward extends Player {
    private int goalsScored;
    private int assists;
    private int penaltiesScored;
    private int penaltiesMissed;
    private double expectedGoals;
    private double expectedAssists;
    private double expectedGoalInvolvements;
    private double expectedGoalsPer90;
    private double expectedAssistsPer90;
    private double expectedGoalInvolvementsPer90;
    private int threat;

    public Forward(int id, String fullName, int yellowCards, int redCards, String form,
                   double pointsPerGame, int squadNumber, int minutes, int influence,
                   int starts, int goalsScored, int assists, int penaltiesScored, int penaltiesMissed, int expectedGoals, int expectedAssists, int expectedGoalInvolvements, int expectedGoalsPer90, int expectedAssistsPer90,
                   int expectedGoalInvolvementsPer90, int threat){
        super(id, fullName, yellowCards, redCards, form,
        pointsPerGame, squadNumber, minutes, influence,
        starts);
        this.goalsScored = goalsScored;
        this.assists = assists;
        this.penaltiesScored= penaltiesScored;
        this.penaltiesMissed=penaltiesMissed;
        this.expectedGoals=expectedGoals;
        this.expectedAssists=expectedAssists;
        this.expectedGoalInvolvements=expectedGoalInvolvements;
        this.expectedGoalsPer90=expectedGoalsPer90;
        this.expectedAssistsPer90=expectedAssistsPer90;
        this.expectedGoalInvolvementsPer90=expectedGoalInvolvementsPer90;
        this.threat=threat;
    }

    public double calculateForwardRating(Map<String, Double> data) {
        // Define weights for each criterion
        Map<Integer, Double> weights = new HashMap<>();
        weights.put(goalsScored, 0.3);
        weights.put(assists, 0.2);
        weights.put((int) expectedGoalInvolvements, 0.1);
        weights.put(threat, 0.3);
        weights.put(penaltiesMissed, -0.2);

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
    public int getGoalsScored() {
        return goalsScored;
    }

    public int getAssists() {
        return assists;
    }

    public int getPenaltiesScored() {
        return penaltiesScored;
    }

    public int getPenaltiesMissed() {
        return penaltiesMissed;
    }

    public double getExpectedGoals() {
        return expectedGoals;
    }

    public double getExpectedAssists() {
        return expectedAssists;
    }

    public double getExpectedGoalInvolvements() {
        return expectedGoalInvolvements;
    }

    public double getExpectedGoalsPer90() {
        return expectedGoalsPer90;
    }

    public double getExpectedAssistsPer90() {
        return expectedAssistsPer90;
    }

    public double getExpectedGoalInvolvementsPer90() {
        return expectedGoalInvolvementsPer90;
    }

    public int getThreat() {
        return threat;
    }

    public void printStats() {
        System.out.println("Forward Stats:");
        System.out.println("Goals Scored: " + goalsScored);
        System.out.println("Assists: " + assists);
        System.out.println("Penalties Scored: " + penaltiesScored);
        System.out.println("Penalties Missed: " + penaltiesMissed);
        System.out.println("Expected Goals: " + expectedGoals);
        System.out.println("Expected Assists: " + expectedAssists);
        System.out.println("Expected Goal Involvements: " + expectedGoalInvolvements);
        System.out.println("Expected Goals Per 90 Minutes: " + expectedGoalsPer90);
        System.out.println("Expected Assists Per 90 Minutes: " + expectedAssistsPer90);
        System.out.println("Expected Goal Involvements Per 90 Minutes: " + expectedGoalInvolvementsPer90);
        System.out.println("Threat: " + threat);

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