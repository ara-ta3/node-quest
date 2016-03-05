class Status {
    constructor(game, currentHp) {
        currentHp = Math.min(currentHp, game.maxHp);
        currentHp = Math.max(currentHp, game.minHp);
        this.currentHp = currentHp;
        this.game = game;
        Object.freeze(this);
    };

    isDead() {
        return this.currentHp <= this.game.minHp;
    };
}

module.exports = Status;
