const Point  = require(__dirname + "/Point.js");
const UserState = require(__dirname + "/../state/User.js");

class Effect {
    to(user) {
        throw new Error("not implemented error");
    }
}

class AttackEffect extends Effect {
    constructor(defaultPower) {
        super();
        this.defaultPower = defaultPower;
    }

    to(targetUser) {
        return (actorParameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = Point.fromMindParameter(actorParameter).toInt() + this.defaultPower;
            targetUser.damaged(p);
            return {
                effect: this,
                attack: {
                    value: p
                },
                cure: {},
                status: {}
            }
        }
    };
}

class CureEffect extends Effect {
    constructor(defaultPower) {
        super();
        this.defaultPower = defaultPower;
    }

    to(targetUser) {
        return (actorParameter) => {
            if(targetUser.isDead()) {
                return UserState.TargetDead;
            }
            const p = Point.fromMindParameter(actorParameter).toInt() + this.defaultPower;
            targetUser.cured(p);
            return {
                effect: this,
                attack: {},
                cure: {
                    value: p
                },
                status: {}
            }
        }
    }
}

class StatusEffect extends Effect {
    constructor(targetStatus) {
        super();
        this.targetStatus = targetStatus;
    }

    to(targetUser) {
        return (actorParameter) => {
            const effective = targetUser.status.has(this.targetStatus);
            targetUser.status.clear(this.targetStatus);
            return {
                effect: this,
                attack: {},
                cure: {},
                status: {
                    target: this.targetStatus,
                    effective: effective
                }
            }
        }
    }
}

module.exports = {
    AttackEffect: AttackEffect,
    CureEffect: CureEffect,
    StatusEffect: StatusEffect
}
