class Status {
    constructor(currentHp, maxHp, currentMp, maxMp) {
        currentHp = Math.min(currentHp, maxHp);
        currentMp = Math.min(currentMp, maxMp);
        this.currentHp = isNaN(currentHp) ? 0 : currentHp;
        this.currentMp = isNaN(currentMp) ? 0 : currentMp;
        this.maxHp = isNaN(maxHp) ? Infinity : maxHp;
        this.maxMp = isNaN(maxMp) ? Infinity : maxMp;
        Object.freeze(this);
    };

    changeHp(nextHp) {
        return new Status(nextHp, this.maxHp, this.currentMp, this.maxMp);
    }

    changeMp(nextMp) {
        return new Status(this.currentHp, this.maxHp, nextMp, this.maxMp);
    }

    canCast(spell) {
        return spell.requiredMp <= this.currentMp;
    };

    isDead() {
        return this.currentHp <= this.minHp;
    };
}

module.exports = Status;
