const assert = require('power-assert');
const User      = require(`${__dirname}/../../../src/game/model/user.js`);
const Status    = require(`${__dirname}/../../../src/game/model/Status.js`);
const Game      = require(`${__dirname}/../../../src/game.js`).Game;
const Equipment = require(`${__dirname}/../../../src/game/model/Equipment.js`);
const Weapon    = require(`${__dirname}/../../../src/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/../../../src/game/model/Parameter.js`);
const HitRate   = require(`${__dirname}/../../../src/game/model/HitRate.js`);
const Spell     = require(`${__dirname}/../../../src/game/model/Spell.js`);
const Effect    = require(`${__dirname}/../../../src/game/model/Effect.js`);
const HitPoint  = require(`${__dirname}/../../../src/game/model/HitPoint.js`);
const MagicPoint   = require(`${__dirname}/../../../src/game/model/MagicPoint.js`);
const AttackEffect = Effect.AttackEffect;
const CureEffect   = Effect.CureEffect;
const StatusEffect = Effect.StatusEffect;
const STATUS_VALUES = require(`${__dirname}/../../../src/game/constant/Status.js`);

describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            const equipment = new Equipment(new Weapon(5, 0, new HitRate(100)));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const actual = actor.attack(target);
            assert.equal(target.hitPoint.current, 5);
            assert.deepEqual(actual, {
                "actor": actor,
                "target": target,
                "attack": {
                    value: 5,
                    hit: true
                },
                effects: null
            });
        });
    });

    describe("cast", () => {
        const emptyEquipment = new Equipment(new Weapon(0, 0, new HitRate(100)));
        const emptyParameter = new Parameter(0, 0);

        it("should return result with specific format", () => {
            const spell   = new Spell("ファイア", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const actual = actor.cast(spell.name, [target]).cast.pop();
            assert.deepEqual(actual, {
                "actor": actor,
                "target": target,
                "attack": null,
                "effects": {
                    "attack": 5,
                    "cure": null,
                    "effects": [{
                        "defaultPower": 5
                    }],
                    "status": []
                }
            });
        });

        it("should decrease target's HP when spell has attack effect", () => {
            const spell   = new Spell("ファイア", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            actor.cast(spell.name, [target]);

            assert.equal(target.hitPoint.current, 5);
        });

        it("should decrease actor's MP when spell is casted", () => {
            const spell   = new Spell("ファイア", 5, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(10, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);

            actor.cast(spell.name, [target]);
            assert.equal(actor.magicPoint.current, 5);
        });


        it("should decrease target's HP more when user has high parameter", () => {
            const param   = new Parameter(10, 0);
            const spell   = new Spell("ファイア", 0, new AttackEffect(10));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(10, 10), emptyEquipment, param, [spell]);
            const target  = new User("id2", "B", new HitPoint(30, 30), new MagicPoint(0, 0), emptyEquipment, emptyParameter);

            actor.cast(spell.name, [target]);
            assert.equal(target.hitPoint.current, 10);
        });

        it("should return as it does not have enough mp when user does not have enough mp", () => {
            const spell   = new Spell("ファイア", 5, new AttackEffect(10));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const result  = actor.cast(spell.name, [target]);
            assert.ok(!result.enoughMagicPoint);
            assert.equal(target.hitPoint.current, 10);
        });

        it("should return as it does not have spell when user does not learn spell", () => {
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            assert.deepEqual(actor.cast("fire"), {
                spellName: "fire",
                hasSpell: false,
                enoughMagicPoint: null,
                cast: null
            });
        });

        it("should increase target's HP when user cast cure spell", () => {
            const spell   = new Spell("キュア", 0, new CureEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            actor.cast(spell.name, [target]);
            assert.equal(target.hitPoint.current, 5);
        });

        it("should clear the target's dead status and its hit point will increase to 1 when an user casts the spell for dead status", () => {
            const spell   = new Spell("raise", 0, new StatusEffect(STATUS_VALUES.DEAD));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            actor.cast(spell.name, [target]);
            assert.equal(target.hitPoint.current, 1);
        });
    });

    describe("isDead", () => {
        const emptyEquipment = new Equipment(new Weapon(0, 0, new HitRate(100)));
        const emptyParameter = new Parameter(0, 0);

        it("should return true when user's HP become empty", () => {
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            actor.damaged(Infinity);
            assert.ok(actor.isDead())
        });

        it("should return true when user's HP is empty", () => {
            const actor   = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            assert.ok(actor.isDead())
        });


    });
});
