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
            const point = new Point(
                actorParameter.mindPower + this.defaultPower,
                actorParameter.mindStability
                );
            return targetUser.damaged(point.toInt());
        };
    };
}

module.exports = {
    AttackEffect: AttackEffect
}
