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

    damaged(x) {
        let currentHp = this.status.currentHp;
        currentHp -= x;
        this.status = new Status(currentHp, this.status.maxHp);
        return this.status;
    };

    static factory(id, name, status) {
        return new User(id, name, status, null);
    };
}

module.exports = User;
