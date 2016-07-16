class Parameter {
    constructor(mindPower = 0 , mindStability = 0, attackPower = 0, skillPoint = 0) {
        this.attackPower = attackPower;
        this.skillPoint = skillPoint;
        this.mindPower = mindPower;
        this.mindStability = mindStability;
    }
}

module.exports = Parameter;
