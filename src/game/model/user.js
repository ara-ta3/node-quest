const Status = require(__dirname + "/status.js");
const Point  = require(__dirname + "/Point.js");

class User {
    constructor(id, name, status, role, equipment) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role;
        this.equipment = equipment;
    };

    attack(target) {
        let damage = new Point(
                this.equipment.weapon.averageOfAttack,
                this.equipment.weapon.divergenceOfAttack
                ).toInt();
        return target.damaged(damage);
    };

    cure(target, point) {
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

    toString() {
        return `Name: ${this.name}, Status: ${this.status.toString()}`;
    };

}

module.exports = User;
