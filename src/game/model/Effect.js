// @flow
import Point from "./Point";
import UserState from "../state/User";
import EffectFeedback from "./effect/Feedback";
import User from "./User";
import Feedback from "./effect/Feedback"
import Parameter from "./Parameter"

function identify<T> (x: T): T {
    return x;
}

class Effect {
    to(user: User) {
        throw new Error("not implemented error");
    }
}

class AttackEffect extends Effect {
    defaultPower: number
    feedbacks: Array<Feedback>
    constructor(defaultPower: number, feedbacks: Array<Feedback>) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser: User): (p: Parameter) => SpellEffectResult {
        return (actorParameter: Parameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = Point.fromMindParameter(actorParameter).toInt() + this.defaultPower;
            targetUser.damaged(p);
            return EffectResult.factory(this, p, null, null, null, null);
        }
    };
}

class CureEffect extends Effect {
    defaultPower: number
    feedbacks: Array<Feedback>
    constructor(defaultPower: number, feedbacks: Array<Feedback>) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser: User): (p: Parameter) => SpellEffectResult {
        return (actorParameter: Parameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = Point.fromMindParameter(actorParameter).toInt() + this.defaultPower;
            targetUser.cured(p);
            return EffectResult.factory(this, null, p, null, null, null);
        }
    }
}

class StatusEffect extends Effect {
    targetStatus: StatusType
    feedbacks: Array<Feedback>
    constructor(targetStatus: StatusType, feedbacks: Array<Feedback>) {
        super();
        this.targetStatus = targetStatus;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser: User): (p: Parameter) => SpellEffectResult {
        return (actorParameter: Parameter) => {
            const effective = targetUser.status.has(this.targetStatus);
            targetUser.status.clear(this.targetStatus);
            return EffectResult.factory(this, null, null, null, null, {
                target: this.targetStatus,
                effective: effective
            });
        }
    }
}

class MindAttackEffect extends Effect {
    defaultPower: number
    feedbacks: Array<Feedback>
    damageAdjust: (x: number) => number
    constructor(defaultPower: number, feedbacks: Array<Feedback>, damageAdjust:(x: number) => number) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
        this.damageAdjust = damageAdjust || identify;
    }

    to(targetUser: User): (p: Parameter) => SpellEffectResult {
        return (actorParameter: Parameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = this.damageAdjust(Point.fromMindParameter(actorParameter).toInt() + this.defaultPower);
            targetUser.mindDamaged(p);
            return EffectResult.factory(this, null, null, p, null, null);
        }
    };
}

class MindCureEffect extends Effect {
    defaultPower: number
    feedbacks: Array<Feedback>
    damageAdjust: (x: number) => number
    constructor(defaultPower: number, feedbacks: Array<Feedback>, damageAdjust:(x: number) => number) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
        this.damageAdjust = damageAdjust || identify;
    }

    to(targetUser: User): (p: Parameter) => SpellEffectResult {
        return (actorParameter: Parameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = this.damageAdjust(Point.fromMindParameter(actorParameter).toInt() + this.defaultPower);
            targetUser.mindCured(p);
            return EffectResult.factory(this, null, null, null, p, null);
        }
    };
}


class EffectResult {
    static factory(
        effect: Effect, 
        attack: ?number, 
        cure: ?number, 
        mindAttack: ?number, 
        mindCure: ?number, 
        status: ?StatusResult
    ): SpellEffectResult {
        return {
            effect: effect,
            attack: attack ? {value: attack} : {},
            cure: cure ? {value: cure} : {},
            mindAttack: mindAttack ? {value: mindAttack} : {},
            mindCure: mindCure ? {value: mindCure} : {},
            status: status ? status : {}
        };
    }

}

module.exports = {
    Effect: Effect,
    AttackEffect: AttackEffect,
    CureEffect: CureEffect,
    StatusEffect: StatusEffect,
    MindAttackEffect: MindAttackEffect,
    MindCureEffect: MindCureEffect
}
