var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: config.APP_NAME,
        uptime: (process.uptime() + "").toHHMMSS()
    });
});

module.exports = router;
