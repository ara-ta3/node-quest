var User = function(id, name, status, role) {
    this.getId      = function () { return id;};
    this.getName    = function () { return name;};
    this.getStatus  = function () { return status;};
    this.getRole    = function () { return role;};

    this.attack = function(target, damange) {
        target.damaged(damage)
    };

    this.damaged = function(x) {
        currentHp = status.hp;
        currentHp -= x;
        status.hp = currentHp;
        return status;
    }

    this.status = function() {
        return status.toString();
    };

    this.factory = function(id, name, status) {
        return new User(id, name, status, null);
    };
};

module.exports = User;
