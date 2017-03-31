/**
 * index.js is the creation of server to communicate with socket.io
 */

/**
 * External Module dependencies.
 */
// Create the serve and the socket connection
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
// Database
const taloen = require('./taloen/taloen');
const funct = require('./taloen/function');

/**
 * GameCreating
 */
// Initialization
const init = require('./initialize')
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

    socket.on('isAlive', (message) => {
        if (message == "alan") {
            socket.emit('isAlive', new Date());
        }
    });

    socket.on('getData', (message) => {
    	socket.emit('getData', taloen.getData(message));
    });

    socket.on('newPlayer', (message) => {
        winston.info("New player with username: '" + message.username + "' and preferedTeam: '" + message.preferedTeam"'");
    	socket.emit('newPlayer', funct.addPlayer(message.username, message.preferedTeam));
    });

    socket.on('disconnect', () => {
        winston.info('A user disconnected');
    });
});

/**
 * Start listen with the server
 */
const port = process.env.PORT || 80;
server.listen(port, () => console.log('Express server listening on %d, in %s mode', port, app.get('env')));
