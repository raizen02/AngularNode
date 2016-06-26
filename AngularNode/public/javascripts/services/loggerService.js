(function() {

    angular.module('app')
        .service('logger', BookAppLogger);

    function LoggerBase() { }

    LoggerBase.prototype.output = function(message) {
        console.log('LoggerBase: ' + message);
    };

    function BookAppLogger() {
        //implement inheritance
        LoggerBase.call(this);

        this.logBook = function(book) {
            console.log('Book: ' + book.title);
        }
        this.log2 = function () {
            console.log('Called function from derived class');
        }
    }

    BookAppLogger.prototype = Object.create(LoggerBase.prototype);

}());