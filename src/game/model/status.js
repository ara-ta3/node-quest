class Status {
    constructor(game, currentHp, maxHp, currentMp, maxMp) {
        currentHp = Math.min(currentHp, game.maxHp, maxHp);
        currentHp = Math.max(currentHp, game.minHp);
        currentMp = Math.min(currentMp, game.maxMp, maxMp);
        currentMp = Math.max(currentMp, game.minMp);
        this.currentHp = currentHp;
        this.currentMp = currentMp;
        this.maxHp = maxHp;
        this.game = game;
        Object.freeze(this);
    };

    isDead() {
        return this.currentHp <= this.game.minHp;
    };
}

module.exports = Status;
