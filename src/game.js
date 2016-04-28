const User      = require(`${__dirname}/game/model/user.js`);
const Status    = require(`${__dirname}/game/model/status.js`);
const Equipment = require(`${__dirname}/game/model/Equipment.js`);
const Weapon    = require(`${__dirname}/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/game/model/Parameter.js`);
const HitRate   = require(`${__dirname}/game/model/HitRate.js`);
const EventEmitter = require('eventemitter2').EventEmitter2;

class Game extends EventEmitter {
    constructor(minHp, maxHp, maxMp) {
        super();
        this.users = [];
        this.minHp = minHp;
        this.maxHp = maxHp;
        this.maxMp = maxMp;
    };

    setUsers(users) {
        this.users = users;
        this.users.forEach((u) => {
            u.on("hp-changed", (data) => {
                this.emit("user-hp-changed", {
                    target: u,
                    value: data.value
                })
            })
        })
    }

    findUser(name) {
        let targets = this.users.filter((u) => u.name === name);
        return targets.length === 0 ? null : targets.pop();
    };

    defaultStatus() {
        return new Status(this, this.maxHp, this.maxHp, this.maxMp, this.maxMp);
    };

    defaultEquipment() {
        return new Equipment(new Weapon(this.maxHp / 200, this.maxHp / 1000), new HitRate(90));
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
    Weapon: Weapon,
    Parameter: Parameter,
    HitRate: HitRate
}
