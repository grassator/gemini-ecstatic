var ecstatic = require('ecstatic');
var http = require('http');
var path = require('path');
var url = require('url');

module.exports = function (gemini, opts) {

    var server;
    var rootUrl = url.parse(gemini.config.rootUrl);
    opts.root = (path.resolve(process.cwd()), opts.root || '.');

    gemini.on('startRunner', function () {
        return new Promise(function (resolve, reject) {
            console.log('Starting ecstatic.');
            server = http.createServer(ecstatic(opts));
            server.listen(rootUrl.port, rootUrl.hostname, function (argument) {
                console.log('Started ecstatic.');
                resolve();
            });
        });
    });

    gemini.on('endRunner', function (runner, data) {
        return new Promise(function (resolve) {
            console.log('Stopping ecstatic.');
            server.close(function () {
                console.log('Stopped ecstatic.');
                resolve();
            });
        });
    });

};
