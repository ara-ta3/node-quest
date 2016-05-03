const assert = require('power-assert');
const User      = require(`${__dirname}/../../../src/game/model/user.js`);
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

describe("Effect", () => {
    describe("effectTo", () => {
        const emptyEquipment = new Equipment(new Weapon(0, 0, new HitRate(100)));
        const emptyParameter = new Parameter(0, 0);

        it("should return result with specific format on attack effect", () => {
            const spell   = new Spell("fire", 0, new AttackEffect(5));
            const target  = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const actual = spell.effectTo(target)(emptyParameter)
            assert.deepEqual(actual, {
                "attack": 5,
                "cure": null,
                "effects": [{
                    "defaultPower": 5
                }],
                "status": []
            });
            assert.ok(actual.effects[0] instanceof AttackEffect)
        });

        it("should return result with specific format on cure effect", () => {
            const spell   = new Spell("cure", 0, new CureEffect(5));
            const target  = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const actual = spell.effectTo(target)(emptyParameter)
            assert.deepEqual(actual, {
                "attack": null,
                "cure": 5,
                "effects": [{
                    "defaultPower": 5
                }],
                "status": []
            });
            assert.ok(actual.effects[0] instanceof CureEffect)
        });

        it("should return result with specific format on status effect", () => {
            const spell   = new Spell("cure", 0, new StatusEffect(STATUS_VALUES.DEAD));
            const target  = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const actual = spell.effectTo(target)(emptyParameter)
            assert.deepEqual(actual, {
                "attack": null,
                "cure": null,
                "effects": [{
                    "targetStatus": STATUS_VALUES.DEAD
                }],
                "status": [STATUS_VALUES.DEAD]
            });
            assert.ok(actual.effects[0] instanceof StatusEffect)
        });

        it("should return result with some effects", () => {
            const spell   = new Spell("cure", 0, [
                    new StatusEffect(STATUS_VALUES.DEAD),
                    new CureEffect(500)
            ]);
            const target  = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const actual = spell.effectTo(target)(emptyParameter)
            assert.deepEqual(actual, {
                "attack": null,
                "cure": 500,
                "effects": [
                {
                    "targetStatus": STATUS_VALUES.DEAD
                },
                {
                    "defaultPower": 500
                }

                ],
                "status": [STATUS_VALUES.DEAD]
            });
            assert.ok(actual.effects[0] instanceof StatusEffect)

        });
    });
});
