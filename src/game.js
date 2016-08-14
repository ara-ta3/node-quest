import {EventEmitter2 as EventEmitter } from "eventemitter2"
const User      = require(`${__dirname}/game/model/user.js`);
const Status    = require(`${__dirname}/game/model/Status.js`);
const Equipment = require(`${__dirname}/game/model/Equipment.js`);
const Weapon    = require(`${__dirname}/game/model/Weapon.js`);
const Parameter = require(`${__dirname}/game/model/Parameter.js`);
const HitRate   = require(`${__dirname}/game/model/HitRate.js`);
const Spell     = require(`${__dirname}/game/model/Spell.js`);
const Effect    = require(`${__dirname}/game/model/Effect.js`);
const HitPoint  = require(`${__dirname}/game/model/HitPoint.js`);
const Critical  = require(`${__dirname}/game/model/Critical.js`);
const UserStates= require(`${__dirname}/game/state/User.js`);
const MagicPoint    = require(`${__dirname}/game/model/MagicPoint.js`);
const STATUS_VALUES = require(`${__dirname}/game/constant/Status.js`);
import Job from "./game/model/Job"
import Feedback from "./game/model/effect/Feedback"
import FeedbackResult from "./game/model/effect/FeedbackResult"

class Game extends EventEmitter {
    constructor(minHitPoint, maxHitPoint, minMagicPoint, maxMagicPoint) {
        super();
        this.users = [];
        this.minHitPoint = isNaN(minHitPoint) ? 0 : minHitPoint;
        this.minMagicPoint = isNaN(minMagicPoint) ? 0 : minMagicPoint;
        this.maxHitPoint = isNaN(maxHitPoint) ? Infinity : maxHitPoint;
        this.maxMagicPoint = isNaN(maxMagicPoint) ? Infinity : maxMagicPoint;
    };

    setUsers(users) {
        this.users = users;
    }

    findUser(name) {
        const targets = this.users.filter((u) => u.name === name);
        return targets.length === 0 ? null : targets.pop();
    };
}

module.exports = {
    Game: Game,
    User: User,
    HitPoint: HitPoint,
    MagicPoint: MagicPoint,
    Status: Status,
    Equipment: Equipment,
    Weapon: Weapon,
    Parameter: Parameter,
    HitRate: HitRate,
    Critical: Critical,
    Spell: Spell,
    Effect: Effect,
    StatusValues: STATUS_VALUES,
    UserStates: UserStates,
    Job: Job,
    Feedback: Feedback,
    FeedbackResult: FeedbackResult
}
