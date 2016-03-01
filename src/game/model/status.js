module.exports = function(maxHp) {
    var currentHp = maxHp;
    this.getMaxHP = function () {
        return maxHp;
    };

    this.toString = function () {
        return "current HP: " + currentHp + " / " + maxHp;
    };

};
