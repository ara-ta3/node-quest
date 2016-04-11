class Status {
    constructor(game, currentHp, maxHp) {
        currentHp = Math.min(currentHp, game.maxHp, maxHp);
        currentHp = Math.max(currentHp, game.minHp);
        this.currentHp = currentHp;
        this.maxHp = maxHp;
        this.game = game;
        Object.freeze(this);
    };

    isDead() {
        return this.currentHp <= this.game.minHp;
    };
}

module.exports = Status;
