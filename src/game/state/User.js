const Symbol = require('symbol');

module.exports = {
    TargetDead: Symbol.for("target is dead"),
    ActorDead: Symbol.for("actor is dead"),
    NoTargetSpell: Symbol.for("no target spell"),
    NotEnoughMagicPoint: Symbol.for("not enough magic point")
}
