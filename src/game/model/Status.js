const EventEmitter = require('eventemitter2').EventEmitter2;
const STATUS_VALUES = require(`${__dirname}/../constant/Status.js`);

class Status extends EventEmitter {
    constructor(currents) {
        super();
        this.currents = currents || [];
    }

    clear(targetStatus) {
        this.emit("removed", {
            status: this,
            target: targetStatus
        })
        this.currents = this.currents.filter((s) => s !== targetStatus);
    }

    add(targetStatus) {
        this.currents = this.currents.concat([targetStatus]);
    }

    dead() {
        this.add(STATUS_VALUES.DEAD);
    }

    has(status) {
        return this.currents.indexOf(status) !== -1;
    }

    isDead() {
        return this.has(STATUS_VALUES.DEAD)
    }

    effectsApplied(fn) {
        return fn();
    }
}

module.exports = Status;
