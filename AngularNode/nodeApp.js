var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var appNode = express();

// view engine setup
appNode.set('views', path.join(__dirname, 'views'));
appNode.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
appNode.use(logger('dev'));
appNode.use(bodyParser.json());
appNode.use(bodyParser.urlencoded({ extended: false }));
appNode.use(cookieParser());
appNode.use(require('stylus').middleware(path.join(__dirname, 'public')));
appNode.use(express.static(path.join(__dirname, 'public')));

appNode.use('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');

});
appNode.use('/users', users);

// catch 404 and forward to error handler
appNode.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (appNode.get('env') === 'development') {
    appNode.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
appNode.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

appNode.set('port', process.env.PORT || 3000);
module.exports = appNode;

var debug = require('debug')('Test');
var server = appNode.listen(appNode.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
