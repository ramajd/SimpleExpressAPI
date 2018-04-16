
var passport    = require('passport');
var passportJWT = require('passport-jwt');

var config = require('./config');

var authParams = {
    secretOrKey: config.WEB.JWT.SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {

    var strategy = new passportJWT.Strategy(authParams, function (payload, done) {
        var e = new Error('JWT Authentication not implemented yet!');
        e.status = 500;
        return done(e);
    });
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },

        authenticate: function () {
            return function (req, res, next) {
                passport.authenticate("jwt", { session: false }, function (err, user, jwtError) {
                    if(err) {
                        throw err;
                    }
                    if (jwtError) {
                        jwtError.status = 500;
                        throw jwtError;
                    }
                    return next(null);
                })(req, res, next);
            }
        }
    };
}();
