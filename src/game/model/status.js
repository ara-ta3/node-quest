class Status {
    constructor(currentHp, maxHp) {
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    }

    getMaxHP() {
        return this.maxHp;
    }

    toString() {
        return "current HP: " + currentHp + " / " + maxHp;
    }
}

module.exports = Status;
