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
        if (sameAs(target)) {
            point /= 10;
        };
        return target.cured(point);
    };

    fullCare(target) {
        if (sameAs(target)) {
            return null;
        } else {
            return target.cured(Status.maxHp);
        }
    };

    sameAs(target) {
        return target.name === this.name;
    };

    damaged(x) {
        let currentHp = this.status.currentHp;
        currentHp -= x;
        currentHp = Math.max(currentHp, 0);
        this.status = new Status(currentHp, this.status.maxHp);
        return this.status;
    };

    cured(x) {
        let currentHp = this.status.currentHp;
        currentHp += x;
        currentHp = Math.min(currentHp, Status.maxHp);
        this.status = new Status(currentHp, this.status.maxHp);
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
