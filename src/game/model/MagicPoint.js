function filter(v, min, max) {
    v = Math.min(v, max);
    v = Math.max(v, min);
    return v;
}

class MagicPoint {
    constructor(current, max) {
        this.max = max;
        this.min = 0;
        this.current = filter(curremt, 0, this.max);
    };

    change(next) {
        this.current = filter(next, 0, this.max);
        return this;
    }
}

module.exports = MagicPoint;
