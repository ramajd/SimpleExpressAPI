
var extend = require('extend');
var fs     = require('fs');

var default_config = {
    TITLE : 'SimpleExpressAPI',
    WEB : {
        PORT : 8080,
        PREFIX : '/',
        JWT : { SECRET : 'sample jwt secret, you should CHANGE IT in production.' }
    },
    DB : {
    }
};

var running_config = default_config;
var local_config_path = __dirname + '/config.local.js';
if (fs.existsSync(local_config_path)) {
    extend(true, running_config, require(local_config_path));
}

module.exports = running_config;