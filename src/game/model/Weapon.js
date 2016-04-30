class Weapon {
    constructor(averageOfAttack, divergenceOfAttack, hitRate) {
        this.averageOfAttack = averageOfAttack;
        this.divergenceOfAttack = divergenceOfAttack;
        this.hitRate = hitRate;
    }

    hit() {
        return this.hitRate.hit();
    }
}

module.exports = Weapon;
