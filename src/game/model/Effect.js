const Point  = require(__dirname + "/Point.js");
const UserState = require(__dirname + "/../state/User.js");
import EffectFeedback from "./effect/Feedback";

function identify(x) {
    return x;
}

class Effect {
    to(user) {
        throw new Error("not implemented error");
    }
}

class AttackEffect extends Effect {
    constructor(defaultPower, feedbacks) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser) {
        return (actorParameter) => {
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
    constructor(defaultPower, feedbacks) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser) {
        return (actorParameter) => {
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
    constructor(targetStatus, feedbacks) {
        super();
        this.targetStatus = targetStatus;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
    }

    to(targetUser) {
        return (actorParameter) => {
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
    constructor(defaultPower, feedbacks, damageAdjust) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
        this.damageAdjust = damageAdjust || identify;
    }

    to(targetUser) {
        return (actorParameter) => {
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
    constructor(defaultPower, feedbacks, damageAdjust) {
        super();
        this.defaultPower = defaultPower;
        this.feedbacks = (feedbacks ? (Array.isArray(feedbacks) ? feedbacks : [feedbacks]) : []);
        this.damageAdjust = damageAdjust || identify;
    }

    to(targetUser) {
        return (actorParameter) => {
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
    static factory(effect, attack, cure, mindAttack, mindCure, status) {
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
    AttackEffect: AttackEffect,
    CureEffect: CureEffect,
    StatusEffect: StatusEffect,
    MindAttackEffect: MindAttackEffect,
    MindCureEffect: MindCureEffect
}
