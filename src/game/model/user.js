import {EventEmitter2 as EventEmitter } from "eventemitter2"
const Status        = require(__dirname + "/Status.js");
const Parameter     = require(__dirname + "/Parameter.js");
const Point         = require(__dirname + "/Point.js");
const HitPoint      = require(__dirname + "/HitPoint.js");
const MagicPoint    = require(__dirname + "/MagicPoint.js");
const STATUS_VALUES = require(`${__dirname}/../constant/Status.js`);
const UserState     = require(__dirname + "/../state/User.js");
import Job from "./Job";

function findSpell(spellName, spells) {
    return spells.filter((s) => s.name === spellName).pop() || null;
}

class User extends EventEmitter {
    constructor(
            id,
            name,
            hp,
            mp,
            equipment,
            parameter = new Parameter(),
            spells = [],
            status = new Status(),
            job = null
            ) {
        super();
        this.id = id;
        this.name = name;
        this.hitPoint = hp;
        this.magicPoint = mp;
        this.equipment = equipment;
        this.defaultParameter = parameter;
        this.parameter = parameter;
        this.spells = spells;
        this.status = status;
        this.changeJob(job);

        this.status.on("removed", (data) => {
            data.target === STATUS_VALUES.DEAD;
            this.cured(1)
        });

        this.hitPoint.empty() && this.status.dead();
        this.hitPoint.on("changed", (data) => {
            data.next.empty() && this.status.dead();
        });
    };

    attack(target) {
        if(this.isDead()) {
            return UserState.ActorDead;
        } else if(target.isDead()) {
            return UserState.TargetDead;
        }

        const attackResult = this.equipment.weapon.damage(target)(this.parameter);
        const result = User.actResult(this, target, attackResult, null, null);
        attackResult.hit && target.emit("attacked", result);
        return result;
    };

    cast(spellName, target) {
        const spell = findSpell(spellName, this.getLearnedSpells())
        if (this.isDead()) {
            return UserState.ActorDead;
        } else if (spell === null) {
            return UserState.NoTargetSpell;
        } else if (spell.requiredMagicPoint > this.magicPoint.current) {
            return UserState.NotEnoughMagicPoint;
        }

        this.magicPoint = spell.cast(this.magicPoint);
        const result = spell.effectTo(target)(this.parameter);
        if (typeof result === 'symbol') {
            return result;
        }
        const feedbackResults = result.feedbacks.map((f) => f(this));
        return User.actResult(this, target, null, result, feedbackResults);
    }

    damaged(x) {
        this.hitPoint.change(this.hitPoint.current - x);
        return {
            target: this,
            value: x
        };
    };

    cured(x) {
        this.hitPoint.change(this.hitPoint.current + x);
        return {
            target: this,
            value: x
        };
    };

    isDead() {
        return this.status.isDead();
    };

    changeJob(job) {
        if ( job ) {
            this.job = job;
            this.parameter = this.defaultParameter.plus(job.parameterAdjust);
        }
    }

    getLearnedSpells() {
        return this.job ? this.spells.concat(this.job.spells) : this.spells;
    }

    static actResult(actor, target, attack, effects, feedbacks) {
        return {
            actor: actor,
            target: target,
            attack: attack,
            effects: effects,
            feedbacks: feedbacks
        }
    }
}

module.exports = User;
