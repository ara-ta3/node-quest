const User      = require(`${__dirname}/game/model/user.js`);
const Status    = require(`${__dirname}/game/model/status.js`);
const Equipment = require(`${__dirname}/game/model/Equipment.js`);
const Weapon    = require(`${__dirname}/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/game/model/Parameter.js`);

class Game {
    constructor(minHp, maxHp) {
        this.users = [];
        this.minHp = minHp;
        this.maxHp = maxHp;
    };

    setUsers(users) {
        this.users = users;
    }

    findUser(name) {
        let targets = this.users.filter((u) => u.name === name);
        return targets.length === 0 ? null : targets.pop();
    };

    defaultStatus() {
        return new Status(this, this.maxHp);
    };

    defaultEquipment() {
        return new Equipment(new Weapon(this.maxHp / 200, this.maxHp / 1000));
    };

    defaultParameter() {
        return new Parameter(0, 0);
    };

    createUser(id, name) {
        return new User(id, name, this.defaultStatus(), this.defaultEquipment(), this.defaultParameter());
    };
}

module.exports = {
    Game: Game,
    User: User,
    Status: Status,
    Equipment: Equipment,
    Weapon: Weapon
}
