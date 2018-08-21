var express = require('express');
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware');

var app = express();
app.use(proxyMiddleware(['/h5','/H5','/Open','/Control','/Business','/Upload'], {target: 'http://ff-test.66580.cn', changeOrigin: true}));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.use('/images', express.static(path.resolve(__dirname, './dist/images'), {
    maxAge: 1000*60*60*24*31
}));
app.use('/static', express.static(path.resolve(__dirname, './dist/static'), {
    maxAge: 1000*60*60*24*31
}));

// app.get('/*', function (req, res) {
//     console.log(req.originalUrl)
//     // res.sendFile(path.resolve(__dirname, './dist/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Sorry Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.set('env', 'production');
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('<p>'+err.message+'</p>');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('<p>'+err.message+'</p>');
});
var port = 80;
app.set('port', port);

/**
 * Create HTTP server.
 */
var http = require('http');
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
