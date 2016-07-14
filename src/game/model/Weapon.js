const Point         = require(__dirname + "/Point.js");

class Weapon {
    constructor(averageOfAttack, divergenceOfAttack, hitRate, critical) {
        this.averageOfAttack = averageOfAttack;
        this.divergenceOfAttack = divergenceOfAttack;
        this.hitRate = hitRate;
        this.critical = critical;
    }

    critical() {
        return this.critical.hit();
    }

    hit() {
        return this.hitRate.hit();
    }

    damage(target) {
        const hit = this.hit();
        const critical = hit ? this.critical() : false;
        const point = hit ? Point.fromWeapon(this).toInt() * (critical ? 2 : 1) : 0;
        hit && target.damaged(point);

        return Weapon.attackResult(point, hit, critical);
    }

    static attackResult(damage, hit, critical) {
        return {
            value: damage,
            hit: hit,
            critical: critical
        };
    }
}

module.exports = Weapon;
