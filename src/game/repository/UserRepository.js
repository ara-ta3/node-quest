const KEY_FOR_HUBOT_BRAIN = process.env.GAME_USER_BRAIN_KEY ? process.env.GAME_USER_BRAIN_KEY : "game_user_brain_key";
class UserRepositoryOnHubotBrain {

    constructor(brain) {
        this.brain = brain;
    }

    put(users) {
        this.brain.set(KEY_FOR_HUBOT_BRAIN, users);
        return users;
    };

    findAll() {
        return brain.get(KEY_FOR_HUBOT_BRAIN);
    }
}

module.exports = UserRepositoryOnHubotBrain;
