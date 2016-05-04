class TargetDeadException extends Error {
    constructor(target) {
        super(`${target.name} is dead`);
    }
}

class ActorDeadException extends Error {
    constructor(actor) {
        super(`${actor.name} is dead`);
    }
}

class NoTargetSpellException extends Error {
    constructor(message) {
        super(message);
    }
}

class NoEnoughMagicPointException extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    TargetDeadException:TargetDeadException,
    ActorDeadException:ActorDeadException,
    NoTargetSpellException:NoTargetSpellException,
    NoEnoughMagicPointException:NoEnoughMagicPointException
}
