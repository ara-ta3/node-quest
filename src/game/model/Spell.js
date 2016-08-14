const StatusEffect    = require(`${__dirname}/Effect.js`).StatusEffect;

class Spell {
    constructor(name, requiredMp, effects, sideEffects) {
        this.name = name;
        this.requiredMagicPoint = requiredMp;
        this.effects = Array.isArray(effects) ? effects : [effects];
        this.effects.sort((e1, e2) => e2 instanceof StatusEffect)
        this.sideEffects = sideEffects ? (Array.isArray(sideEffects) ? sideEffects : [sideEffects]) : [];
        this.sideEffects.sort((e1, e2) => e2 instanceof StatusEffect)
    }

    cast(mp) {
        return mp.change(mp.current - this.requiredMagicPoint);
    }

    effectTo(user) {
        return (parameter) => this.effects.map(
            (e) => e.to(user)(parameter)
        ).reduce((pre, cur) => {
            if(typeof cur === 'symbol') {
                return cur;
            } else if (typeof pre === 'symbol') {
                return pre;
            }
            return {
                "attack": sumUpIfExists(pre.attack, cur.attack.value),
                "cure": sumUpIfExists(pre.cure, cur.cure.value),
                "status": pre.status.concat([{
                    kind: cur.status.target,
                    effective: cur.status.effective
                }]).filter((s) => s.kind !== undefined),
                "effects": pre.effects.concat([cur.effect])
            };
        }, {
            "attack": null,
            "cure": null,
            "status": [],
            "effects": []
        })
    }

    applySideEffect(actor) {
        return this.sideEffects.map(
            (e) => e.to(actor)(actor.parameter)
        ).reduce((pre, cur) => {
            if(typeof cur === 'symbol') {
                return cur;
            } else if (typeof pre === 'symbol') {
                return pre;
            }
            return {
                "attack": sumUpIfExists(pre.attack, cur.attack.value),
                "cure": sumUpIfExists(pre.cure, cur.cure.value),
                "status": pre.status.concat([{
                    kind: cur.status.target,
                    effective: cur.status.effective
                }]).filter((s) => s.kind !== undefined),
                "effects": pre.effects.concat([cur.effect])
            };

        }, {
            "attack": null,
            "cure": null,
            "status": [],
            "effects": []
        });
    }
}

function sumUpIfExists(v1, v2) {
    return (v1 || v2) ? (v1 || 0) + (v2 || 0) : null
}

module.exports = Spell;
