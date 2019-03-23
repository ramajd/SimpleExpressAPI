
let models = require('require-all')({
    dirname: __dirname,
    filter: /.+-model\.js$/i,
    recursive: false
});

models.initialize = function(cb) { 
    return cb(null);
};

module.exports = models;
