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
        return (parameter) => this.effects.map((e) => e.to(user)).map((effectWith) => effectWith(parameter));
    }
}

module.exports = Spell;
