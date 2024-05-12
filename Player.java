public class Player {
    private int id;
    private String fullName;
    private int yellowCards;
    private int redCards;
    //added attributes:
    private String form;
    private double pointsPerGame;
    private int squadNumber;
    private int minutes;
    private int influence;
    private int starts;
    private double savesPer90;
    private double goalsConcededPer90;
    private double startsPer90;
    private double cleanSheetsPer90;


    public Player(int id, String fullName, int yellowCards, int redCards, String form,
                  double pointsPerGame, int squadNumber, int minutes, int influence,
                  int starts) {
        this.id = id;
        this.fullName = fullName;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.form = form;
        this.pointsPerGame = pointsPerGame;
        this.squadNumber = squadNumber;
        this.minutes = minutes;
        this.influence = influence;
        this.starts = starts;
    }

    public Player(int id, String fullName, int goalsScored, int assists, int yellowCards, int redCards, int saves, int penaltiesScored, int penaltiesMissed, int ownGoals, int penaltiesSaved) {
    }


    public int getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public Integer getYellowCards() {
        return yellowCards;
    }

    public int getRedCards() {
        return redCards;
    }
    //added getters
    public String getForm() {
        return form;
    }

    public double getPointsPerGame() {
        return pointsPerGame;
    }

    public int getSquadNumber() {
        return squadNumber;
    }

    public int getMinutes() {
        return minutes;
    }

    public int getInfluence() {
        return influence;
    }

    public int getStarts() {
        return starts;
    }

    public double getSavesPer90() {
        return savesPer90;
    }

    public double getGoalsConcededPer90() {
        return goalsConcededPer90;
    }

    public double getStartsPer90() {
        return startsPer90;
    }

    public double getCleanSheetsPer90() {
        return cleanSheetsPer90;
    }

    //setters
    public void setId(int id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setYellowCards(int yellowCards) {
        this.yellowCards = yellowCards;
    }

    public void setRedCards(int redCards) {
        this.redCards = redCards;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public void setPointsPerGame(double pointsPerGame) {
        this.pointsPerGame = pointsPerGame;
    }

    public void setSquadNumber(int squadNumber) {
        this.squadNumber = squadNumber;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public void setInfluence(int influence) {
        this.influence = influence;
    }

    public void setStarts(int starts) {
        this.starts = starts;
    }

    public void setSavesPer90(double savesPer90) {
        this.savesPer90 = savesPer90;
    }

    public void setGoalsConcededPer90(double goalsConcededPer90) {
        this.goalsConcededPer90 = goalsConcededPer90;
    }
    public void setStartsPer90(double startsPer90) {
        this.startsPer90 = startsPer90;
    }

    public void setCleanSheetsPer90(double cleanSheetsPer90) {
        this.cleanSheetsPer90 = cleanSheetsPer90;
    }

}