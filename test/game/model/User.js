const assert = require('power-assert');
const User      = require(`${__dirname}/../../../src/game/model/User.js`);
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
const MindAttackEffect =  Effect.MindAttackEffect
const MindCureEffect =  Effect.MindCureEffect
const STATUS_VALUES = require(`${__dirname}/../../../src/game/constant/Status.js`);
const UserState = require(`${__dirname}/../../../src/game/state/User.js`);
import EffectFeedback from "../../../src/game/model/effect/Feedback"
import FeedbackResult from "../../../src/game/model/effect/FeedbackResult"

describe("User", () => {
    describe("attack", () => {
        it("should decrease target HP", () => {
            const equipment = new Equipment(new Weapon("empty-hands", 5, 0, new HitRate(100)));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const actual = actor.attack(target);
            assert.equal(target.hitPoint.current, 5);
            assert.deepEqual(actual, {
                "actor": actor,
                "target": target,
                "attack": {
                    critical: false,
                    value: 5,
                    hit: true
                },
                effects: null,
                "feedbacks": null
            });
        });

        it("should not attack if actor is dead", () => {
            const equipment = new Equipment(new Weapon("empty-hands", 5, 0, new HitRate(100)));
            const actor   = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 0), equipment);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const actual = actor.attack(target);
            assert.equal(actual ,  UserState.ActorDead);
        });

        it("should not attack if target is dead", () => {
            const equipment = new Equipment(new Weapon("empty-hands", 5, 0, new HitRate(100)));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), equipment);
            const target  = new User("id2", "B", new HitPoint(0, 10), new MagicPoint(0, 0), equipment);
            const actual = actor.attack(target);
            assert.equal(actual ,  UserState.TargetDead);
        });

    });

    describe("cast", () => {
        const emptyEquipment = new Equipment(new Weapon("empty-hands", 0, 0, new HitRate(100)));
        const emptyParameter = new Parameter(0, 0);

        it("should return result with specific format", () => {
            const spell   = new Spell("ファイア", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const actual = actor.cast(spell.name, target);
            assert.deepEqual(actual, {
                "actor": actor,
                "target": target,
                "attack": null,
                "effects": {
                    "attack": 5,
                    "cure": null,
                    "mindAttack": null,
                    "mindCure": null,
                    "effects": [{
                        "defaultPower": 5,
                        "feedbacks": []
                    }],
                    "feedbacks": [],
                    "status": []
                },
                "feedbacks": []
            });
        });

        it("should decrease target's HP when spell has attack effect", () => {
            const spell   = new Spell("ファイア", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);

            assert.equal(target.hitPoint.current, 5);
        });

        it("should decrease actor's MP when spell is casted", () => {
            const spell   = new Spell("ファイア", 5, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(10, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);

            actor.cast(spell.name, target);
            assert.equal(actor.magicPoint.current, 5);
        });


        it("should decrease target's HP more when user has high parameter", () => {
            const param   = new Parameter(10, 0);
            const spell   = new Spell("ファイア", 0, new AttackEffect(10));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(10, 10), emptyEquipment, param, [spell]);
            const target  = new User("id2", "B", new HitPoint(30, 30), new MagicPoint(0, 0), emptyEquipment, emptyParameter);

            actor.cast(spell.name, target);
            assert.equal(target.hitPoint.current, 10);
        });

        it("should return as it does not have enough mp when user does not have enough mp", () => {
            const spell   = new Spell("ファイア", 5, new AttackEffect(10));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const result  = actor.cast(spell.name, target);
            assert.ok(!result.enoughMagicPoint);
            assert.equal(target.hitPoint.current, 10);
        });

        it("should return as it does not have spell when user does not learn spell", () => {
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            assert.equal(actor.cast("fire", target) ,  UserState.NoTargetSpell);
        });

        it("should increase target's HP when user cast cure spell", () => {
            const spell   = new Spell("キュア", 0, new CureEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id1", "A", new HitPoint(2, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);
            assert.equal(target.hitPoint.current, 7);
        });

        it("should clear the target's dead status and its hit point will increase to 1 when an user casts the spell for dead status", () => {
            const spell   = new Spell("raise", 0, new StatusEffect(STATUS_VALUES.DEAD));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 10), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);
            assert.equal(target.hitPoint.current, 1);
        });

        it("should not attack if actor is dead", () => {
            const spell   = new Spell("fire", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(0, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const actual = actor.cast(spell.name, target);
            assert.equal(actual ,  UserState.ActorDead);
        });

        it("should not attack if target is dead", () => {
            const spell   = new Spell("fire", 0, new AttackEffect(5));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(0, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
 
            const actual = actor.cast(spell.name, target);
            assert.equal(actual, UserState.TargetDead);
        });

        it("should decrease target's HP and increase actor's HP when spell has attack effect and cure feedback", () => {
            class CureFeedback extends EffectFeedback {
                apply(castResult) {
                    return (actor) => { 
                        const result = actor.cured(castResult.attack.value);
                        return new FeedbackResult(0, result.value);
                    }
                }
            }

            const spell   = new Spell("drain", 0, new AttackEffect(5, new CureFeedback()));
            const actor   = new User("id1", "A", new HitPoint(5, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(0, 0), emptyEquipment, emptyParameter);
            const result  = actor.cast(spell.name, target);

            assert.equal(target.hitPoint.current, 5);
            assert.equal(actor.hitPoint.current, 10);
            assert.deepEqual(result.feedbacks, [new FeedbackResult(0, 5)]);
        });

        it("should decrease target's MP when spell has mind attack effect", () => {
            const spell   = new Spell("some spell", 0, new MindAttackEffect(20));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(100, 100), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(100, 100), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);

            assert.equal(target.magicPoint.current, 80);
        });

        it("should decrease target's MP when spell has mind attack effect with damage adjust", () => {
            const spell   = new Spell("some spell", 0, new MindAttackEffect(20, [], (x) => x / 10));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(100, 100), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(100, 100), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);

            assert.equal(target.magicPoint.current, 98);
        });


        it("should decrease target's MP and increase actor's MP when spell has mind attack effect and cure feedback", () => {
            class MindCureFeedback extends EffectFeedback {
                apply(castResult) {
                    return (actor) => { 
                        const result = actor.mindCured(castResult.mindAttack.value || 0);
                        return new FeedbackResult(0, 0, result.value, 0);
                    }
                }
            }
            const spell   = new Spell("some spell", 0, new MindAttackEffect(20, new MindCureFeedback()));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(80, 100), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(100, 100), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);

            assert.equal(target.magicPoint.current, 80);
            assert.equal(actor.magicPoint.current, 100);
        });

        it("should increase target's MP when spell has mind attack effect", () => {
            const spell   = new Spell("some spell", 0, new MindCureEffect(20));
            const actor   = new User("id1", "A", new HitPoint(10, 10), new MagicPoint(80, 100), emptyEquipment, emptyParameter, [spell]);
            const target  = new User("id2", "B", new HitPoint(10, 10), new MagicPoint(80, 100), emptyEquipment, emptyParameter);
            actor.cast(spell.name, target);

            assert.equal(target.magicPoint.current, 100);
        });


    });

    describe("isDead", () => {
        const emptyEquipment = new Equipment(new Weapon("empty-hands", 0, 0, new HitRate(100)));
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
