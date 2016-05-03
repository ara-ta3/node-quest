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
        return (actorParameter) => targetUser.damaged(Point.fromMindParameter(actorParameter).toInt() + this.defaultPower);
    };
}

class CureEffect extends Effect {
    constructor(defaultPower) {
        super();
        this.defaultPower = defaultPower;
    }

    to(targetUser) {
        return (actorParameter) => targetUser.cured(Point.fromMindParameter(actorParameter).toInt() + this.defaultPower)
    }
}

class StatusEffect extends Effect {
    constructor(targetStatus) {
        super();
        this.targetStatus = targetStatus;
    }

    to(targetUser) {
        return (actorParameter) => targetUser.status.clear(this.targetStatus);
    }
}

module.exports = {
    AttackEffect: AttackEffect,
    CureEffect: CureEffect,
    StatusEffect: StatusEffect
}
