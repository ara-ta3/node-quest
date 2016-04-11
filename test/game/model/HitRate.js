const assert = require('power-assert');
const HitRate   = require(`${__dirname}/../../../src/game/model/HitRate.js`);

// TODO property based testing
describe("HitRate", () => {
    describe("hit", () => {
        it("should return true if hit rate is 100", () => {
            const h = new HitRate(100);
            assert.ok(h.hit())
        });

        it("should return false if hit rate is 0", () => {
            const h2 = new HitRate(0);
            assert.ok(!h2.hit())
        });
    });
});

