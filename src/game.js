let User = require(`${__dirname}/game/model/user.js`);
let Status = require(`${__dirname}/game/model/status.js`);

class Game {
    // TODO management of attack point
    constructor(users, maxHp) {
        this.users = users;
    };

    findUser(name) {
        let targets = this.users.filter((u) => u.name === name);
        return targets.length === 0 ? null : targets.pop();
    }
}

module.exports = {
    Game: Game,
    User: User,
    Status: Status
}
