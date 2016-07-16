import Parameter from "./Parameter.js"

export default class Job {
    constructor(name, spells = [], parameterAdjust = new Parameter()) {
        this.name = name;
        this.spells = spells;
        this.parameterAdjust = parameterAdjust;
    }
}
