// @flow
import {EventEmitter2 as EventEmitter } from "eventemitter2"
import STATUS_VALUES from "../constant/Status"

class Status extends EventEmitter {
    currents: Array<StatusType>
    constructor(currents: ?Array<StatusType>) {
        super();
        this.currents = currents || [];
    }

    clear(targetStatus: StatusType): void {
        this.emit("removed", {
            status: this,
            target: targetStatus
        })
        this.currents = this.currents.filter((s) => s !== targetStatus);
    }

    add(targetStatus: StatusType): void {
        this.currents = this.currents.concat([targetStatus]);
    }

    dead(): void {
        this.add(STATUS_VALUES.DEAD);
    }

    has(status: StatusType): bool {
        return this.currents.indexOf(status) !== -1;
    }

    isDead(): bool {
        return this.has(STATUS_VALUES.DEAD)
    }
}

module.exports = Status;
