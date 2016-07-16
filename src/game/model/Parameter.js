class Parameter {
    constructor(mindPower = 0 , mindStability = 0, attackPower = 0, skillPoint = 0) {
        this.attackPower    = attackPower;
        this.skillPoint     = skillPoint;
        this.mindPower      = mindPower;
        this.mindStability  = mindStability;
    }

    plus(parameterAdjust) {
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
