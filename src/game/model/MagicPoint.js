class MagicPoint {
    constructor(current, max) {
        current = Math.min(current, max);
        current = Math.max(current, 0);
        this.current = current;
        this.max = max;
        this.min = 0;
    };

    change(next) {
        this.current = next;
        return this;
    }
}

module.exports = MagicPoint;
