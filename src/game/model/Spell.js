class Spell {
    constructor(name, effect) {
        this.name = name;
        this.effect = effect;
    }

    effect(user) {
        return this.effect.to(user);
    }
}

module.exports = Spell;
