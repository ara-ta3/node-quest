// @flow

import Weapon from "./Weapon"
import Parameter from "./Parameter"

export default class Point {
    average: number
    sigma: number

    constructor(average: number, sigma: number) {
        this.average = average;
        this.sigma = sigma;
    };

    toInt(): number {
        return Math.round(this.boxMullerRNorm(Math.random(), Math.random()) * this.sigma + this.average);
    }

    boxMullerRNorm(x1: number, x2: number): number {
        return Math.sqrt(-2 * Math.log(1 - x1)) * Math.cos(2 * Math.PI * x2);
    };

    static fromWeaponAndAttackParameter(weapon: Weapon, parameter: Parameter): Point {
        return new Point(
            weapon.averageOfAttack + parameter.attackPower,
            Math.max(weapon.divergenceOfAttack - parameter.skillPoint, 0)
        );
    }

    static fromMindParameter(parameter: Parameter): Point {
        return new Point(
            parameter.mindPower,
            parameter.mindStability
        )
    }
}
