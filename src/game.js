let User = require(`${__dirname}/game/model/user.js`);
let Status = require(`${__dirname}/game/model/status.js`);

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
        return new Status(this.maxHp, this.maxHp);
    };
}

module.exports = {
    Game: Game,
    User: User,
    Status: Status
}
