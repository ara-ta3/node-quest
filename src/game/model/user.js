const Symbol = require('symbol');
const EventEmitter  = require('eventemitter2').EventEmitter2;
const Status        = require(__dirname + "/Status.js");
const Point         = require(__dirname + "/Point.js");
const HitPoint      = require(__dirname + "/HitPoint.js");
const MagicPoint    = require(__dirname + "/MagicPoint.js");
const STATUS_VALUES = require(`${__dirname}/../constant/Status.js`);
const UserState     = require(__dirname + "/../state/User.js");

function findSpell(spellName, spells) {
    return spells.filter((s) => s.name === spellName).pop() || null;
}

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

        this.status.on("removed", (data) => {
            data.target === STATUS_VALUES.DEAD;
            this.cured(1)
        });

        this.hitPoint.empty() && this.status.dead();
        this.hitPoint.on("changed", (data) => {
            data.next.empty() && this.status.dead();
        });
    };

    attack(target) {
        if(this.isDead()) {
            return UserState.ActorDead;
        } else if(target.isDead()) {
            return UserState.TargetDead;
        }

        const hit = this.equipment.weapon.hit();
        const point = hit ? Point.fromWeapon(this.equipment.weapon).toInt() : 0;
        hit && target.damaged(point);
        const result = User.actResult(this, target, {
            value: point,
            hit: hit
        }, null);
        hit && target.emit("attacked", result);
        return result;
    };

    cast(spellName, target) {
        const spell = findSpell(spellName, this.spells)
        if (this.isDead()) {
            return UserState.ActorDead;
        } else if (spell === null) {
            return UserState.NoTargetSpell;
        } else if (spell.requiredMagicPoint > this.magicPoint.current) {
            return UserState.NotEnoughMagicPoint;
        }

        this.magicPoint = spell.cast(this.magicPoint);
        const result = spell.effectTo(target)(this.parameter);
        if (result instanceof Symbol) {
            return result;
        }
        return User.actResult(this, target, null, result);
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

    static actResult(actor, target, attack, effects) {
        return {
            actor: actor,
            target: target,
            attack: attack,
            effects: effects
        }
    }
}

module.exports = User;
