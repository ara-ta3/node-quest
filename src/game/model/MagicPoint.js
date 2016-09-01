// @flow
import {EventEmitter2 as EventEmitter } from "eventemitter2"

function filter(v: number, min: number, max: number): number {
    v = Math.min(v, max);
    v = Math.max(v, min);
    return v;
}

class MagicPoint extends EventEmitter {
    current: number
    max: number
    constructor(current: number, max: number) {
        super();
        this.max = max;
        this.min = 0;
        this.current = filter(current, 0, this.max);
    };

    change(next: number): MagicPoint {
        this.current = filter(next, 0, this.max);
        this.emit("changed", {
            next: this
        });
        return this;
    }
}

module.exports = MagicPoint;
