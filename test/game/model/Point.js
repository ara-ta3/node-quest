const assert = require('power-assert');
const Point  = require(`${__dirname}/../../../src/game/model/Point.js`);
const Weapon = require(`${__dirname}/../../../src/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/../../../src/game/model/Parameter.js`);

describe("Point", () => {
    describe("fromWeaponAndAttackParameter", () => {
        it("should return averageOfAttack + attackPower when divergenceOfAttack and skillPoint is 0", () => {
            const p = Point.fromWeaponAndAttackParameter(new Weapon("empty-hands", 100, 0), new Parameter(0, 0, 50, 0));
            assert.equal(p.toInt(), 150)
        });
    });

    describe("fromMindParameter", () => {
        it("should return mindPower when mindStability is 0", () => {
            const p = Point.fromMindParameter(new Parameter(50, 0));
            assert.equal(p.toInt(), 50)
        });
    });
});

