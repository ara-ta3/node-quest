class Status {
    constructor(game, currentHp, maxHp, currentMp, maxMp) {
        currentHp = Math.min(currentHp, game.maxHp, maxHp);
        currentHp = Math.max(currentHp, game.minHp);
        currentMp = Math.min(currentMp, game.maxMp, maxMp);
        currentMp = Math.max(currentMp, game.minMp);
        this.currentHp = isNaN(currentHp) ? 0 : currentHp;
        this.currentMp = isNaN(currentMp) ? 0 : currentMp;
        this.maxHp = isNaN(maxHp) ? Infinity : maxHp;
        this.maxMp = isNaN(maxMp) ? Infinity : maxMp;
        this.game = game;
        Object.freeze(this);
    };

    changeHp(nextHp) {
        return new Status(this.game, nextHp, this.maxMp, this.currentMp, this.maxMp);
    }

    changeMp(nextMp) {
        return new Status(this.game, this.currentHp, this.maxMp, nextMp, this.maxMp);
    }

    canCast(spell) {
        return spell.requiredMp <= this.currentMp;
    };

    isDead() {
        return this.currentHp <= this.game.minHp;
    };
}

module.exports = Status;
