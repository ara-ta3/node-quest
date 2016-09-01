// @flow

import {EventEmitter2 as EventEmitter } from "eventemitter2"
import User from "./game/model/User"
import Status from "./game/model/Status"
import Equipment from "./game/model/Equipment"
import Weapon from "./game/model/Weapon"
import Parameter from "./game/model/Parameter"
import HitRate from "./game/model/HitRate"
import Spell from "./game/model/Spell"
import Effect from "./game/model/Effect"
import HitPoint from "./game/model/HitPoint"
import Critical from "./game/model/Critical"
import UserStates from "./game/state/User"
import MagicPoint from "./game/model/MagicPoint"
import STATUS_VALUES from "./game/constant/Status"
import Job from "./game/model/Job"
import Feedback from "./game/model/effect/Feedback"
import FeedbackResult from "./game/model/effect/FeedbackResult"

class Game extends EventEmitter {
    users: Array<User>
    minHitPoint: number
    maxHitPoint: number
    minMagicPoint: number
    maxMagicPoint: number 
    constructor(
        minHitPoint: number, 
        maxHitPoint: number, 
        minMagicPoint:number, 
        maxMagicPoint: number) {
        super();
        this.users = [];
        this.minHitPoint = isNaN(minHitPoint) ? 0 : minHitPoint;
        this.minMagicPoint = isNaN(minMagicPoint) ? 0 : minMagicPoint;
        this.maxHitPoint = isNaN(maxHitPoint) ? Infinity : maxHitPoint;
        this.maxMagicPoint = isNaN(maxMagicPoint) ? Infinity : maxMagicPoint;
    };

    setUsers(users: Array<User>): void {
        this.users = users;
    }

    findUser(name: string): ?User {
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
