// @flow

class Parameter {
    mindPower: number
    mindStability: number
    attackPower: number
    skillPoint: number
    constructor(
        mindPower: number = 0,
        mindStability: number = 0,
        attackPower: number = 0,
        skillPoint: number = 0
    ) {
        this.attackPower    = attackPower;
        this.skillPoint     = skillPoint;
        this.mindPower      = mindPower;
        this.mindStability  = mindStability;
    }

    plus(parameterAdjust: Parameter):Parameter {
        // TODO should be separated classes. Parameter and ParameterAdjust
        return new Parameter(
                Math.max(this.mindPower + parameterAdjust.mindPower, 0),
                Math.max(this.mindStability + parameterAdjust.mindStability, 0),
                Math.max(this.attackPower + parameterAdjust.attackPower, 0),
                Math.max(this.skillPoint + parameterAdjust.skillPoint, 0)
                );
    }
}

module.exports = Parameter;
