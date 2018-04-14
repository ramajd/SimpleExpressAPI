
var extend = require('extend');
var fs     = require('fs');

var default_config = {
    APP_NAME : 'SimpleExpressAPI',
    WEB : {
        PORT : 8080,
        PREFIX : '/api'
    }
};

var running_config = default_config;
var local_config_path = __dirname + '/config.local.js';
if (fs.existsSync(local_config_path)) {
    extend(true, running_config, require(local_config_path));
}

module.exports = running_config;