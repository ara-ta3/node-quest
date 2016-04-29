class Spell {
    constructor(name, requiredMp, effect) {
        this.name = name;
        this.requiredMp = requiredMp;
        this.effect = effect;
    }

    effectTo(user) {
        return this.effect.to(user);
    }
}

module.exports = Spell;
