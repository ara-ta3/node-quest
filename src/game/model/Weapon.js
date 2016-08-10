const Point     = require(`${__dirname}/Point.js`);
const Critical  = require(`${__dirname}/Critical.js`);

class Weapon {
    constructor(name, averageOfAttack, divergenceOfAttack, hitRate, critical) {
        this.name = name;
        this.averageOfAttack = averageOfAttack;
        this.divergenceOfAttack = divergenceOfAttack;
        this.hitRate = hitRate;
        this.critical = critical || new Critical(0);
    }

    criticalHit() {
        return this.critical.hit();
    }

    hit() {
        return this.hitRate.hit();
    }

    damage(target) {
        return (actorParameter) => {
            const hit = this.hit();
            const critical = hit ? this.criticalHit() : false;
            const point = hit ? 
                Point.fromWeaponAndAttackParameter(this, actorParameter).toInt() * (critical ? 2 : 1):
                0;
            hit && target.damaged(point);

            return Weapon.attackResult(point, hit, critical);
        }
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
