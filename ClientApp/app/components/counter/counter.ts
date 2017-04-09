export class Counter {
    public numberOfPlayers = 1;
    public currentPlayerIndex = 0;
    public isGameRunning = false;

    public selectedGameTypeId: number;
    public selectedGameType: GameType;
    public gameTypes: GameType[] = [
        new GameType(1, "301", 301),
        new GameType(2, "501", 501),
        new GameType(3, "Round the Clock", 0)
    ];

    public scores: number[] = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
    ];

    public players: Player[] = [];

    public startGame() {
        this.selectedGameType = this.gameTypes.find((gt, idx) => { return gt.id == this.selectedGameTypeId });
        console.log('Playing ' + this.selectedGameType.name + ' with ' + this.numberOfPlayers + ' players.');
        this.players.length = 0;
        for (let i = 0; i < this.numberOfPlayers; i++) {
            this.players.push(new Player("Player " + (i + 1), this.selectedGameType.initialScore));
        }
        this.isGameRunning = true;
    }

    public stopGame() {
        this.isGameRunning = false;
    }

    public logScore(score: number) {
        let currentPlayer = this.players[this.currentPlayerIndex];

        if (currentPlayer.score >= score) {
            currentPlayer.score -= score;
        }
        if (currentPlayer.hasWon(this.players, this.selectedGameType)) {
            this.stopGame();
            alert('Player ' + currentPlayer.name + ' has won the game!');
        }

        console.log(currentPlayer.name + ' score: ' + currentPlayer.score);

        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.numberOfPlayers) {
            this.currentPlayerIndex = 0;
        }
    }

    public checkWinningCondition() {

    }

}

class Player {
    constructor(name: string, currentScore: number) {
        this.name = name;
        this.score = currentScore;
    }

    public hasWon(players: Player[], gameType: GameType): boolean {
        switch (gameType.id) {
            case 1:
            case 2:
                return this.score == 0;
        }
        return false;
    }

    public name = "";
    public score = 0;
}

class GameType {
    constructor(id: number, name: string, initialScore: number) {
        this.id = id;
        this.name = name;
        this.initialScore = initialScore;
    };

    public id: number;
    public name: string;
    public initialScore: number;
}