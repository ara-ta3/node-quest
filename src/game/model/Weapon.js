// @flow
import Point from "./Point"
import Critical from "./Critical"
import HitRate from "./HitRate"
import User from "./User"
import Parameter from "./Parameter"

class Weapon {
    name: string
    averageOfAttack: number
    divergenceOfAttack: number
    hitRate: HitRate
    critical: Critical

    constructor(
        name: string, 
        averageOfAttack: number,
        divergenceOfAttack: number,
        hitRate: HitRate,
        critical: Critical
    ) {
        this.name = name;
        this.averageOfAttack = averageOfAttack;
        this.divergenceOfAttack = divergenceOfAttack;
        this.hitRate = hitRate;
        this.critical = critical || new Critical(0);
    }

    criticalHit(): bool {
        return this.critical.hit();
    }

    hit(): bool {
        return this.hitRate.hit();
    }

    damage(target: User): (p: Parameter) => UserAttackResult {
        return (actorParameter: Parameter) => {
            const hit = this.hit();
            const critical = hit ? this.criticalHit() : false;
            const point = hit ? 
                Point.fromWeaponAndAttackParameter(this, actorParameter).toInt() * (critical ? 2 : 1):
                0;
            hit && target.damaged(point);

            return Weapon.attackResult(point, hit, critical);
        }
    }

    static attackResult(damage: number, hit: bool, critical: bool): UserAttackResult {
        return {
            value: damage,
            hit: hit,
            critical: critical
        };
    }
}

module.exports = Weapon;
