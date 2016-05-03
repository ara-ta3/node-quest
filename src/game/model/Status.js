const EventEmitter = require('eventemitter2').EventEmitter2;
const STATUS_VALUES = require(`${__dirname}/../constant/Status.js`);

function exists(arr, v) {
    return arr.indexOf(v) !== -1;
}

function add(status, target) {
    status.currents = status.currents.concat([target]);
}

function remove(status, target) {
    status.emit("removed", {
        status: status,
        target: target
    })
    status.currents = status.currents.filter((s) => s !== target);
}

class Status extends EventEmitter {
    constructor(currents) {
        super();
        this.currents = currents || [];
    }

    clear(targetStatus) {
        remove(this, targetStatus);
    }

    dead() {
        add(this, STATUS_VALUES.DEAD);
    }

    has(status) {
        return this.currents.indexOf(status) !== -1;
    }

    isDead() {
        return this.has(STATUS_VALUES.DEAD)
    }
}

module.exports = Status;
