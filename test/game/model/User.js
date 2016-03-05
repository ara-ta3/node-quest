const assert = require('power-assert');
const User = require(`${__dirname}/../../../src/game/model/user.js`);
const Status = require(`${__dirname}/../../../src/game/model/status.js`);
const Game = require(`${__dirname}/../../../src/game.js`).Game;
const Equipment = require(`${__dirname}/../../../src/game/model/Equipment.js`);
const Weapon = require(`${__dirname}/../../../src/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/../../../src/game/model/Parameter.js`);

describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            let game    = new Game(0, 10);
            let equipment = new Equipment(new Weapon(0, 0));
            let actor   = new User("id1", "A", new Status(game, 10), equipment);
            let target  = new User("id2", "B", new Status(game, 10), equipment);
            actor.attack(target, 5);
            assert(target.status.currentHp === 5);
        });

        it("should increase attack point with weapon", () => {
            let game    = new Game(0, 10);
            let equipment = new Equipment(new Weapon(5, 0));
            let actor   = new User("id1", "A", new Status(game, 10), equipment);
            let target  = new User("id2", "B", new Status(game, 10), equipment);
            actor.attack(target, 5);
            assert(target.status.currentHp === 0);
        });
    });

    describe("cure", () => {
        let equipment = new Equipment(new Weapon(0, 0));
        let dummyParameter = new Parameter(0, 0);
        it("should increase target HP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), equipment, dummyParameter);
            let target  = new User("id2", "B", new Status(game, 5), equipment, dummyParameter);
            assert(target.status.currentHp === 5);
            actor.cure(target, 3, 0);
            assert(target.status.currentHp === 8);
        });

        it("should not increase target HP over maxHP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10), equipment, dummyParameter);
            let target  = new User("id2", "B", new Status(game, 5), equipment, dummyParameter);
            assert(target.status.currentHp === 5);
            actor.cure(target, 100, 0);
            assert(target.status.currentHp === 10);
        });

        it("should increase cure point with high parameter", () => {
            let game    = new Game(0, 10);
            let parameter = new Parameter(5, 0);
            let actor   = new User("id1", "A", new Status(game, 10), equipment, parameter);
            let target  = new User("id2", "B", new Status(game, 2), equipment, parameter);
            actor.cure(target, 3, 0);
            assert(target.status.currentHp === 10);
        });

    });

    describe("sameAs", () => {
        it("should return true if name is the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10));
            let target  = new User("id2", "A", new Status(game, 5));
            assert(actor.sameAs(target) === true);
        });

        it("should return false if name is not the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10));
            let target  = new User("id1", "B", new Status(game, 10));
            assert(actor.sameAs(target) === false);
        });
    });

    describe("fullCare", () => {
        it("should increase target HP to max HP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10));
            let target  = new User("id2", "B", new Status(game, 1));
            actor.fullCare(target);
            assert.equal(target.status.currentHp, 10);
        });
    });
});
