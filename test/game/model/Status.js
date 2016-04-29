const assert = require('power-assert');
const Status = require(`${__dirname}/../../../src/game/model/status.js`);
const Game = require(`${__dirname}/../../../src/game.js`).Game;

describe("Status", () => {
    describe("isDead", () => {
        it("should return true if currentHp equal to or lower than 0", () => {
            let status = new Status(0, 10);
            assert.ok(status.isDead());
        });

        it("should return false if currentHp greater than 0", () => {
            let status = new Status(1, 10);
            assert.ok(!status.isDead());
        });
    });

    describe("object", () => {
        it("should not change property", () => {
            let status = new Status(1, 10);
            assert.throws( () => {
                status.currentHp = 10;
            });
        });
    });
});

