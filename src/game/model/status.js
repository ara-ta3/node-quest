class Status {
    constructor(currentHp, maxHp) {
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    };

    toString() {
        return "current HP: " + currentHp + " / " + maxHp;
    };

    isDead() {
        return this.currentHp <= 0;
    };
}

module.exports = Status;
