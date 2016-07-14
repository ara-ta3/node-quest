class Critical {
    constructor(rate) {
        this.rate = rate;
    }

    hit() {
        const rand = Math.random() * 100;
        return rand < this.rate;
    }
}

module.exports = Critical;
