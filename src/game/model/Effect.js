const Point  = require(__dirname + "/Point.js");

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
            targetUser.status.clear(this.targetStatus);
            return {
                effect: this,
                attack: {},
                cure: {},
                status: {
                    target: this.targetStatus
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
