// @flow
import {EventEmitter2 as EventEmitter } from "eventemitter2"
import Status from "./Status"
import Parameter from "./Parameter"
import Point from "./Point"
import HitPoint from "./HitPoint"
import MagicPoint from "./MagicPoint"
import Job from "./Job";
import Spell from "./Spell"
import Equipment from "./Equipment"
const UserState = require("../state/User")
const STATUS_VALUES = require("../constant/Status")

function findSpell(spellName: string, spells: Array<Spell>) {
    return spells.filter((s) => s.name === spellName).pop() || null;
}

class User extends EventEmitter {
    id: number|string
    name: string
    hitPoint: HitPoint
    magicPoint: MagicPoint
    equipment: Equipment
    defaultParameter: Parameter
    parameter: Parameter
    spells: Array<Spell>
    status: Status
    job: ?Job
    constructor(
            id: number|string,
            name: string,
            hp: HitPoint,
            mp: MagicPoint,
            equipment: Equipment,
            parameter: Parameter = new Parameter(),
            spells: Array<Spell> = [],
            status: Status = new Status(),
            job: ?Job = null
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

    attack(target: User) {
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

    cast(spellName: string, target: User) {
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
        const resultType = typeof result;
        if (resultType === 'symbol') {
            return result;
        }
        const feedbackResults = result.feedbacks.map((f) => f(this));
        return User.actResult(this, target, null, result, feedbackResults);
    }

    damaged(x: number) {
        this.hitPoint.change(this.hitPoint.current - x);
        return {
            target: this,
            value: x
        };
    };

    cured(x: number) {
        this.hitPoint.change(this.hitPoint.current + x);
        return {
            target: this,
            value: x
        };
    };

    mindDamaged(x: number) {
        this.magicPoint.change(this.magicPoint.current - x);
        return {
            target: this,
            value: x
        };
    }

    mindCured(x: number) {
        this.magicPoint.change(this.magicPoint.current + x);
        return {
            target: this,
            value: x
        };
    }

    isDead(): bool {
        return this.status.isDead();
    };

    changeJob(job: ?Job): void {
        if ( job ) {
            this.job = job;
            this.parameter = this.defaultParameter.plus(job.parameterAdjust);
        }
    }

    getLearnedSpells(): Array<Spell> {
        return this.job ? this.spells.concat(this.job.spells) : this.spells;
    }

    static actResult(
        actor: User, 
        target: User, 
        attack: ?UserAttackResult,
        effects: ?Array<Effect>,
        feedbacks: ?Array<Feedback>
    ): UserActionResult  {
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
