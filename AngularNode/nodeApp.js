var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');

var nodeApp = express();

// view engine setup
nodeApp.set('views', path.join(__dirname, '/views'));
nodeApp.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
nodeApp.use(logger('dev'));
nodeApp.use(bodyParser.json());
nodeApp.use(bodyParser.urlencoded({ extended: false }));
nodeApp.use(cookieParser());
nodeApp.use(express.static(path.join(__dirname, 'public')));

nodeApp.use('/', routes);
nodeApp.use('/api/users', users);
nodeApp.use('/api/books', books);

// catch 404 and forward to error handler
nodeApp.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (nodeApp.get('env') === 'development') {
    nodeApp.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
nodeApp.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('server');

nodeApp.set('port', process.env.PORT || 3000);

nodeApp.listen(nodeApp.get('port'));

console.log('Listening on port: ' + nodeApp.get('port'));

module.exports = nodeApp;
