const EventEmitter = require('eventemitter2').EventEmitter2;

function filter(v, min, max) {
    v = Math.min(v, max);
    v = Math.max(v, min);
    return v;
}

class HitPoint extends EventEmitter {
    constructor(current, max) {
        super();
        this.max = max;
        this.min = 0;
        this.current = filter(current, 0, this.max);
    };

    change(next) {
        this.current = filter(next, 0, this.max);;
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
