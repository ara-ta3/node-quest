Fs   = require('fs');
Path = require('path');

module.exports = function(robot) {
    var path = Path.resolve(__dirname, 'src/hubot');
    Fs.exists(path, function(exists) {
        if (exists) {
            Fs.readdirSync(path).forEach(function(f) {
                robot.loadFile(path, f);
            });
        }
    });
}

