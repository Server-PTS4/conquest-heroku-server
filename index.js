/**
 * External Module dependencies.
 */
const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
// Print console
const winston = require('winston');
// Log file
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'log/filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'log/filelog-error.log',
            level: 'error'
        })
    ]
});

/**
 * Internal Module dependencies.
 */
const teamHandler = require('./team');
const spots = require('./spots');
const question = require('./question');
// Database
const taloen = require('./taloen');
const init = require('./initialize')

/**
 * GameCreating
 */
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });
console.log(db.get('teams').value());

init.newGame();

/**
 * Express Route configuration
 */
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/web/');
});

/**
 * Socket.io configuration
 */
socket.on('connection', (socket) => {
    winston.info('A user connected');
    
    socket.on('disconnect', () => {
        winston.info('A user disconnected');
    });

    socket.on('isAlive', (message) => {
        if (message == "alan") {
            socket.emit('isAlive', "turing");
        }
    });

    socket.on('getData', (message) => {
    	socket.emit('getData', taloen.getData(message));
    });
});

/**
 * Start listen with the server
 */
const port = process.env.PORT || 80;
server.listen(port, () => console.log('Express server listening on %d, in %s mode', port, app.get('env')));