const assert = require('power-assert');
const Status = require(`${__dirname}/../../../src/game/model/Status.js`);
const Game = require(`${__dirname}/../../../src/game.js`).Game;

const STATUS_VALUES = require(`${__dirname}/../../../src/game/constant/Status.js`);

describe("Status", () => {
    describe("isDead", () => {
        it("should return true if dead is called", () => {
            let status = new Status();
            status.dead()
            assert.ok(status.isDead());
        });

        it("should return false if dead is not called", () => {
            let status = new Status();
            assert.ok(!status.isDead());
        });

        it("should return false if cleared", () => {
            let status = new Status();
            status.dead();
            assert.ok(status.isDead());
            status.clear(STATUS_VALUES.DEAD);
            assert.ok(!status.isDead());
        });
    });
});

