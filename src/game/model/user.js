const Status = require(__dirname + "/status.js");
const Point  = require(__dirname + "/Point.js");

class User {
    constructor(id, name, status, equipment, parameter) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.equipment = equipment;
        this.parameter = parameter;
    };

    attack(target, damage) {
        damage = new Point(
                damage + this.equipment.weapon.averageOfAttack,
                this.equipment.weapon.divergenceOfAttack
                ).toInt();
        return target.damaged(damage);
    };

    cure(target, point) {
        point = new Point(
                point + this.parameter.mindPower,
                this.parameter.mindStability
                ).toInt();
        return target.cured(point);
    };

    fullCare(target) {
        return target.cured(Infinity);
    };

    sameAs(target) {
        return target.name === this.name;
    };

    damaged(x) {
        this.status = new Status(this.status.game, this.status.currentHp - x);
        return this.status;
    };

    cured(x) {
        this.status = new Status(this.status.game, this.status.currentHp + x);
        return this.status;
    };

    isDead() {
        return this.status.isDead();
    };
}

module.exports = User;
