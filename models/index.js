
let models = require('require.all')({
    dir: '.',
    match: /-model\.js$/i,
    recursive: false
});

models.initialize = function(cb) { 
    return cb(null);
};

module.exports = models;
