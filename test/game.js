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

    it("should emit user-hp-changed event when user damaged", () => {
        let game = new Game(0, 10);
        let u = game.createUser(1, "hoge");
        game.setUsers([u]);
        let flag = false
        game.on("user-hp-changed", (data) => {
            flag = true
        });
        u.damaged(5)
        assert.ok(flag)
    });

    it("should emit user-hp-changed event when user cured", () => {
        let game = new Game(0, 10);
        let u = game.createUser(1, "hoge");
        game.setUsers([u]);
        let flag = false
        game.on("user-hp-changed", (data) => {
            flag = true
        });
        u.cured(5)
        assert.ok(flag)
    });

});
