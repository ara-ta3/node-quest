let User = require(`.${__dirname}src/game/model/user.js`);
let Status = require(`.${__dirname}src/game/model/status.js`);
let UserRepository = require(`.${__dirname}src/game/repository/UserRepository.js`);

class Game {
    constructor(robotBrain) {
        this.userRepository = new UserRepository(robotBrain);
        this.users = this.userRepository.findAll();
    };
};

module.exports = Game;
