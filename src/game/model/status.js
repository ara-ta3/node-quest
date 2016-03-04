class Status {
    constructor(currentHp, maxHp) {
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    };

    toString() {
        return `current HP: ${this.currentHp} / ${this.maxHp}`;
    };

    isDead() {
        return this.currentHp <= 0;
    };
}

module.exports = Status;
