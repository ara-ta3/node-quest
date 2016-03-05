let User = require(`${__dirname}/game/model/user.js`);
let Status = require(`${__dirname}/game/model/status.js`);
let Equipment = require(`${__dirname}/game/model/Equipment.js`);
let Weapon = require(`${__dirname}/game/model/Weapon.js`);

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
        return new Equipment(new Weapon(this.maxHp / 100, this.maxHp / 1000));
    };

    createUser(id, name) {
        return new User(id, name, this.defaultStatus(), null, this.defaultEquipment());
    };
}

module.exports = {
    Game: Game,
    User: User,
    Status: Status,
    Equipment: Equipment,
    Weapon: Weapon
}
