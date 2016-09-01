// @flow
import Parameter from "./Parameter.js"
import Spell from "./Spell"

export default class Job {
    name: string
    spells: Array<Spell>
    parameterAdjust: Parameter
    constructor(name: string, spells: Array<Spell> = [], parameterAdjust: Parameter = new Parameter()) {
        this.name = name;
        this.spells = spells;
        this.parameterAdjust = parameterAdjust;
    }
}
