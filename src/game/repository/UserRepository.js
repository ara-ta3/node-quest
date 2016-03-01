var UserRepositoryOnHubotBrain = function(brain) {
    var KEY_FOR_HUBOT_BRAIN = process.env.GAME_USER_BRAIN_KEY;
    KEY_FOR_HUBOT_BRAIN = KEY_FOR_HUBOT_BRAIN || "game_user_brain_key"
    this.put = function(users) {
        brain.set(KEY_FOR_HUBOT_BRAIN, users);
        return users;
    };


    this.findAll = function() {
        var users = brain.get(KEY_FOR_HUBOT_BRAIN);
        return users;
    };
};

module.exports = UserRepositoryOnHubotBrain;
