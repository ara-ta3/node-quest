const assert = require('power-assert');
import Point from "../../../src/game/model/Point"
import Weapon from "../../../src/game/model/Weapon"
import Parameter from "../../../src/game/model/Parameter"

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

