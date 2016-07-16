import assert from "power-assert";
import Job from "../../../src/game/model/Job.js"
import Parameter from "../../../src/game/model/Parameter.js"

describe("Job", () => {
    it("hello", () => {
        const job = new Job();

        assert.deepEqual(job.parameterAdjust, new Parameter());
        assert.equal(job.spells.length, 0);
    });
});
