var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var auth   = require('./auth');
var models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

models.initialize(function (err) {
    if (err) {
        throw err;
    }
});
app.use(auth.initialize());
app.use(function (req, res, next) {

    res.serverError = function (msg) {
        var err = new Error(msg);
        err.status = 500;
        next(err);
    };

    res.badRequest = function (msg) {
        var err = new Error(msg);
        err.status = 400;
        next(err);
    };

    res.forbidden = function (msg) {
        var err = new Error(msg);
        err.status = 403;
        next(err);
    };

    res.notFound = function (msg) {
        var err = new Error(msg);
        err.status = 404;
        next(err);
    };

    res.success = function (data) {
        if (data) {
            return res.status(200).json(data);
        }
        return res.status(204).send('');
    };

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
});

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

app.use(config.WEB.PREFIX, require('./routes'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
