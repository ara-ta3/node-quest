const STATUS_DEAD = "dead";

function exists(arr, v) {
    return arr.indexOf(v) !== -1;
}

class Status {
    constructor(currents) {
        this.currents = currents || [];
    }

    dead() {
        this.currents = [STATUS_DEAD];
    }

    isDead() {
        return exists(this.currents, STATUS_DEAD)
    }
}

module.exports = Status;
