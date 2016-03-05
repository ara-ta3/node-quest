let assert = require('power-assert');
let User = require(`${__dirname}/../../../src/game/model/user.js`);
let Status = require(`${__dirname}/../../../src/game/model/status.js`);


describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id2", "B", new Status(10, 10), null);
            actor.attack(target, 5);
            assert(target.status.currentHp === 5);
        });
    });

    describe("cure", () => {
        it("should increase target HP", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id2", "B", new Status(5, 10), null);
            assert(target.status.currentHp === 5);
            actor.cure(target, 3);
            assert(target.status.currentHp === 8);
        });

        it("should not increase target HP over maxHP", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id2", "B", new Status(5, 10), null);
            assert(target.status.currentHp === 5);
            actor.cure(target, 100);
            assert(target.status.currentHp === 10);
        });

        it("should increase target HP with one-tenth point if cure by oneself", () => {
            let actor   = new User("id1", "A", new Status(2, 10), null);
            actor.cure(actor, 10);
            assert(actor.status.currentHp === 3);
        });
    });

    describe("sameAs", () => {
        it("should return true if name is the same", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id2", "A", new Status(5, 10), null);
            assert(actor.sameAs(target) === true);
        });

        it("should return false if name is not the same", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id1", "B", new Status(10, 10), null);
            assert(actor.sameAs(target) === false);
        });
    });

    describe("fullCare", () => {
        it("should return null if target is the same as actor", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            assert(actor.fullCare(actor) === null);
        });

        it("should increase target HP to max HP", () => {
            let actor   = new User("id1", "A", new Status(10, 10), null);
            let target  = new User("id2", "B", new Status(1, 10), null);
            actor.fullCare(target);
            assert(target.status.currentHp === 10);
        });
    });
});
