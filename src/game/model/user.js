const Status = require(__dirname + "/status.js");
const Point  = require(__dirname + "/Point.js");
const EventEmitter = require('eventemitter2').EventEmitter2;
const HitPoint     = require(__dirname + "/HitPoint.js");
const MagicPoint   = require(__dirname + "/MagicPoint.js");

class User extends EventEmitter {
    constructor(id, name, hp, mp, equipment, parameter, spells, status) {
        super();
        this.id = id;
        this.name = name;
        this.hitPoint = hp;
        this.magicPoint = mp;
        this.equipment = equipment;
        this.parameter = parameter;
        this.spells = spells || [];
        this.status = status || new Status();

        this.hitPoint.on("changed", (data) => {
            data.next.empty() && this.status.dead();
        });
    };

    attack(target) {
        const hit = this.equipment.weapon.hit();
        const point = hit ? Point.fromWeapon(this.equipment.weapon).toInt() : 0;
        hit && target.damaged(point);
        const result = {
            actor: this,
            target: target,
            value: point,
            hit: hit
        };
        hit && target.emit("attacked", result);
        return result;
    };

    setSpells(spells) {
        this.spells = spells;
    }

    cast(spell, targets) {
        if(!this.canCast(spell) || !spell.canCast(this.magicPoint)) {
            return null;
        }

        this.magicPoint = spell.cast(this.magicPoint);
        return targets.map(
            (user) => spell.effectTo(user)
        ).map(
            (effectWithParameter) => effectWithParameter(this.parameter)
        );
    }

    canCast(spell) {
        return this.spells.filter((s) => s.name === spell.name).length > 0;
    }

    damaged(x) {
        this.hitPoint.change(this.hitPoint.current - x);
        return {
            target: this,
            value: x
        };
    };

    cured(x) {
        this.hitPoint.change(this.hitPoint.current + x);
        return {
            target: this,
            value: x
        };
    };

    isDead() {
        return this.status.isDead();
    };
}

module.exports = User;
