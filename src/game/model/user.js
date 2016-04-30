const Status = require(__dirname + "/status.js");
const Point  = require(__dirname + "/Point.js");
const EventEmitter = require('eventemitter2').EventEmitter2;

class User extends EventEmitter{
    constructor(id, name, status, equipment, parameter, spells) {
        super();
        this.id = id;
        this.name = name;
        this.status = status;
        this.equipment = equipment;
        this.parameter = parameter;
        this.spells = spells || [];
    };

    attack(target) {
        let point = Point.fromWeapon(this.equipment.weapon).toInt();
        const hit = this.equipment.weapon.hit();
        point = hit ? point : 0;
        this.emit("attack", {
            target: target,
            value: point,
            hit: hit
        })
        const status =  hit ? target.damaged(point) : target.status;
        hit && target.emit("attacked", {
            actor: this,
            target: target,
            value: point,
            hit: hit
        });
        return status;
    };

    cure(target) {
        const point = Point.fromMindParameter(this.parameter).toInt();
        this.emit("cure", {
            target: target,
            value: point
        })
        let status =  target.cured(point);
        target.emit("cured", {
            actor: this,
            target: target,
            value: point
        });
        return status;
    };

    learn(spell) {
        this.spells.push(spell);
        return this.spells;
    };

    cast(spell, targets) {
        if(!this.status.canCast(spell)) {
            return null;
        }

        this.emit("cast", {
            targets: targets,
            spell: spell,
        });
        targets.forEach((user) => user.emit("casted", {
            actor: this,
            target: user,
            spell: spell
        }));
        this.status = this.status.changeMp(this.status.currentMp - spell.requiredMp);
        return targets.map(
            (user) => spell.effectTo(user)
        ).map(
            (effectWithParameter) => effectWithParameter(this.parameter)
        );
    }

    findSpell(spellName) {
        return this.spells.filter((s) => s.name === spellName).pop() || null;
    };

    fullCare(target) {
        return target.cured(Infinity);
    };

    sameAs(target) {
        return target.name === this.name;
    };

    damaged(x) {
        this.status = this.status.changeHp(this.status.currentHp - x)
        this.emit("hp-changed", {
            value: x
        })
        return this.status;
    };

    cured(x) {
        this.status = this.status.changeHp(this.status.currentHp + x)
        this.emit("hp-changed", {
            value: x
        })
        return this.status;
    };

    isDead() {
        return this.status.isDead();
    };
}

module.exports = User;
