let Status = require(__dirname + "/status.js");

class User {
    constructor(id, name, status, role) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role;
    };

    attack(target, damage) {
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

    static factory(id, name, status) {
        return new User(id, name, status, null);
    };
}

module.exports = User;
