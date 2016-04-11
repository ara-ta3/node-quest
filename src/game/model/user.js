const Status = require(__dirname + "/status.js");
const Point  = require(__dirname + "/Point.js");
const EventEmitter = require('eventemitter2').EventEmitter2;

class User extends EventEmitter{
    constructor(id, name, status, equipment, parameter) {
        super();
        this.id = id;
        this.name = name;
        this.status = status;
        this.equipment = equipment;
        this.parameter = parameter;
    };

    attack(target, damage) {
        damage = new Point(
            damage + this.equipment.weapon.averageOfAttack,
            this.equipment.weapon.divergenceOfAttack
        ).toInt();
        const hit = this.equipment.weapon.hitRate.hit();
        damage = hit ? damage : 0;
        this.emit("attack", {
            target: target,
            value: damage,
            hit: hit
        })
        const status =  hit ? target.damaged(damage) : target.status;
        hit && target.emit("damaged", {
            actor: this,
            target: target,
            value: damage,
            hit: hit
        });
        return status;
    };

    cure(target, point) {
        point = new Point(
            point + this.parameter.mindPower,
            this.parameter.mindStability
        ).toInt();
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

    fullCare(target) {
        return target.cured(Infinity);
    };

    sameAs(target) {
        return target.name === this.name;
    };

    damaged(x) {
        this.status = new Status(this.status.game, this.status.currentHp - x);
        this.emit("hp-changed", {
            value: x
        })
        return this.status;
    };

    cured(x) {
        this.status = new Status(this.status.game, this.status.currentHp + x);
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
