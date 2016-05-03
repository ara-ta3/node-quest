class Spell {
    constructor(name, requiredMp, effects) {
        this.name = name;
        this.requiredMagicPoint = requiredMp;
        this.effects = Array.isArray(effects) ? effects : [effects];
    }

    cast(mp) {
        return mp.change(mp.current - this.requiredMagicPoint);
    }

    effectTo(user) {
        return (parameter) => this.effects.map((e) => {
            const effectWith = e.to(user);
            return effectWith(parameter)
        }).reduce((pre, cur) => {
            return {
                "attack": sumUpIfExists(pre.attack, cur.attack.value),
                "cure": sumUpIfExists(pre.cure, cur.cure.value),
                "status": pre.status.concat(cur.status.target).filter((s) => s !== undefined),
                "effects": pre.effects.concat([cur.effect])
            };
        }, {
            "attack": null,
            "cure": null,
            "status": [],
            "effects": []
        })
    }
}

function sumUpIfExists(v1, v2) {
    return (v1 || v2) ? (v1 || 0) + (v2 || 0) : null
}

module.exports = Spell;
