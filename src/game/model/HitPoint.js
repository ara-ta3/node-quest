const EventEmitter = require('eventemitter2').EventEmitter2;

class HitPoint extends EventEmitter {
    constructor(current, max) {
        super();
        current = Math.min(current, max);
        current = Math.max(current, 0);
        this.current = current;
        this.max = max;
        this.min = 0;
    };

    change(next) {
        this.current = next;
        this.emit("changed", {
            next: this
        });
        return this;
    }

    empty() {
        return this.current <= this.min;
    };
}

module.exports = HitPoint;
