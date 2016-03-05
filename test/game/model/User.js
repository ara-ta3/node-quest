const assert = require('power-assert');
const User = require(`${__dirname}/../../../src/game/model/user.js`);
const Status = require(`${__dirname}/../../../src/game/model/status.js`);
const Game = require(`${__dirname}/../../../src/game.js`).Game;
const Equipment = require(`${__dirname}/../../../src/game/model/Equipment.js`)
const Weapon = require(`${__dirname}/../../../src/game/model/Weapon.js`)

describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            let game    = new Game(0, 10);
            let equipment = new Equipment(new Weapon(5, 0));
            let actor   = new User("id1", "A", new Status(game, 10), null, equipment);
            let target  = new User("id2", "B", new Status(game, 10), null, equipment);
            actor.attack(target, 5);
            assert(target.status.currentHp === 5);
        });
    });

    describe("cure", () => {
        it("should increase target HP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), null);
            let target  = new User("id2", "B", new Status(game, 5), null);
            assert(target.status.currentHp === 5);
            actor.cure(target, 3);
            assert(target.status.currentHp === 8);
        });

        it("should not increase target HP over maxHP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), null);
            let target  = new User("id2", "B", new Status(game, 5), null);
            assert(target.status.currentHp === 5);
            actor.cure(target, 100);
            assert(target.status.currentHp === 10);
        });

    });

    describe("sameAs", () => {
        it("should return true if name is the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), null);
            let target  = new User("id2", "A", new Status(game, 5), null);
            assert(actor.sameAs(target) === true);
        });

        it("should return false if name is not the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), null);
            let target  = new User("id1", "B", new Status(game, 10), null);
            assert(actor.sameAs(target) === false);
        });
    });

    describe("fullCare", () => {
        it("should increase target HP to max HP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), null);
            let target  = new User("id2", "B", new Status(game, 1), null);
            actor.fullCare(target);
            assert.equal(target.status.currentHp, 10);
        });
    });
});
