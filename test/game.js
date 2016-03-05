const Game = require(`${__dirname}/../src/game.js`).Game;
const assert = require("power-assert");

describe("Game", () => {
    describe("createUser", () => {
        it("should success to create user", () => {
            let game = new Game(0, 10);
            let u = game.createUser(1, "hoge");
            assert.equal(u.name, "hoge");
        });
    });
});
