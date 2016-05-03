class Spell {
    constructor(name, requiredMp, effect) {
        this.name = name;
        this.requiredMagicPoint = requiredMp;
        this.effect = effect;
    }

    canCast(mp) {
        return this.requiredMagicPoint <= mp.current;
    }

    cast(mp) {
        return mp.change(mp.current - this.requiredMagicPoint);
    }

    effectTo(user) {
        return this.effect.to(user);
    }
}

module.exports = Spell;
