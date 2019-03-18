var express = require('express');
var router = express.Router();
var config = require('../config');
var debug = require('debug')(config.TITLE + ':routes');
var AuthHelper = require('../helpers/auth');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: config.TITLE,
        uptime: (process.uptime() + "").toHHMMSS(),
        menu: [
            { title: 'API Documentation', path: config.WEB.PREFIX + 'docs'}
        ]
    });
});
/**
 * all files with `-routes.js` suffix will be loaded automatically.
 */
const routes = require('require.all')({
    dir: '.',
    match: /routes\.js$/i,
    recursive: false
});

for (let k in routes) {
    routes[k].forEach(route => {
        router[route.method.toLowerCase()](
            route.path,
            (req, res, next) => {                       // eslint-disable-line no-unused-vars 
                AuthHelper.AuthenticateRoute(route)
                    .then( user => { 
                        req.user = user;
                        return AuthHelper.AuthorizeRoute(route, user);
                    })
                    .then (() => route.func(req, res));
            }
        );
    });
    debug(k, 'loaded.');
}

module.exports = router;
