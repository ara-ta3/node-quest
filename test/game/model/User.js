const assert = require('power-assert');
const User = require(`${__dirname}/../../../src/game/model/user.js`);
const Status = require(`${__dirname}/../../../src/game/model/status.js`);
const Game = require(`${__dirname}/../../../src/game.js`).Game;
const Equipment = require(`${__dirname}/../../../src/game/model/Equipment.js`);
const Weapon = require(`${__dirname}/../../../src/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/../../../src/game/model/Parameter.js`);
const HitRate   = require(`${__dirname}/../../../src/game/model/HitRate.js`);
const Spell  = require(`${__dirname}/../../../src/game/model/Spell.js`);
const Effect = require(`${__dirname}/../../../src/game/model/Effect.js`);
const AttackEffect = Effect.AttackEffect;

describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            let game    = new Game(0, 10);
            let equipment = new Equipment(new Weapon(5, 0, new HitRate(100)));
            let actor   = new User("id1", "A", new Status(game, 10, 10), equipment);
            let target  = new User("id2", "B", new Status(game, 10, 10), equipment);
            actor.attack(target);
            assert(target.status.currentHp === 5);
        });
    });

    describe("cure", () => {
        let equipment = new Equipment(new Weapon(0, 0, new HitRate(100)));
        it("should increase target HP", () => {
            let parameter = new Parameter(3, 0);
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10), equipment, parameter);
            let target  = new User("id2", "B", new Status(game, 5, 10), equipment, parameter);
            assert(target.status.currentHp === 5);
            actor.cure(target);
            assert(target.status.currentHp === 8);
        });

        it("should not increase target HP over maxHP", () => {
            let parameter = new Parameter(100, 0);
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10), equipment, parameter);
            let target  = new User("id2", "B", new Status(game, 5, 10), equipment, parameter);
            assert(target.status.currentHp === 5);
            actor.cure(target);
            assert(target.status.currentHp === 10);
        });

    });

    describe("cast", () => {
        let dummyEquipment = new Equipment(new Weapon(0, 0, new HitRate(100)));
        let dummyParameter = new Parameter(0, 0);

        it("should decrease target's HP when spell has attack effect", () => {
            let spell   = new Spell("ファイア", 0, new AttackEffect(10));
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10), dummyEquipment, dummyParameter);
            let target  = new User("id2", "B", new Status(game, 10, 10), dummyEquipment, dummyParameter);
            actor.learn(spell);
            actor.cast(spell, [target]);
            assert.equal(target.status.currentHp, 0);
        });

        it("should decrease actor's MP when spell is casted", () => {
            let spell   = new Spell("ファイア", 5, new AttackEffect(10));
            let game    = new Game();
            let actor   = new User("id1", "A", new Status(game, 10, 10, 10, 10), dummyEquipment, dummyParameter);
            let target  = new User("id2", "B", new Status(game, 10, 10), dummyEquipment, dummyParameter);
            actor.learn(spell);
            actor.cast(spell, [target]);
            assert.equal(actor.status.currentMp, 5);
        });


        it("should decrease target's HP more when user has high parameter", () => {
            let param   = new Parameter(10, 0);
            let spell   = new Spell("ファイア", 0, new AttackEffect(10));
            let game    = new Game(0, 100);
            let actor   = new User("id1", "A", new Status(game, 10, 10), dummyEquipment, param);
            let target  = new User("id2", "B", new Status(game, 30, 30), dummyEquipment, dummyParameter);
            actor.learn(spell);
            actor.cast(spell, [target]);
            assert.equal(target.status.currentHp, 10);
        });

        it("should return null when user does not have enough mp", () => {
            let game    = new Game(0, 1000);
            let actor   = new User("id1", "A", new Status(game, 10, 10, 0, 10), dummyEquipment, dummyParameter);
            let target  = new User("id2", "B", new Status(game, 30, 30), dummyEquipment, dummyParameter);
            let spell   = new Spell("ファイア", 5, new AttackEffect(10));
            actor.learn(spell);
            let result  = actor.cast(spell, [target]);
            assert.equal(result, null);
            assert.equal(target.status.currentHp, 30);
        });

        it("should return learned spell when findSpell is called", () => {
            let spell   = new Spell("ファイア", 0, new AttackEffect(10));
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10), dummyEquipment, dummyParameter);
            actor.learn(spell);
            assert.equal(actor.findSpell("ファイア"), spell)
        });

        it("should return null when user does not learn spell", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10), dummyEquipment, dummyParameter);
            assert.equal(actor.findSpell("ファイア"), null)
        });
    });

    describe("sameAs", () => {
        it("should return true if name is the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10));
            let target  = new User("id2", "A", new Status(game, 5, 10));
            assert(actor.sameAs(target) === true);
        });

        it("should return false if name is not the same", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10));
            let target  = new User("id1", "B", new Status(game, 10, 10));
            assert(actor.sameAs(target) === false);
        });
    });

    describe("fullCare", () => {
        it("should increase target HP to max HP", () => {
            let game    = new Game(0, 10);
            let actor   = new User("id1", "A", new Status(game, 10, 10));
            let target  = new User("id2", "B", new Status(game, 1, 10));
            actor.fullCare(target);
            assert.equal(target.status.currentHp, 10);
        });
    });
});
