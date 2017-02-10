/**
 * Created by charles on 09/01/2017.
 */

/**
 * External Module dependencies.
 */

const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
const winston = require('winston');
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
const dbUtil = require('./db');
// DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', {
    storage: fileSync
})
/**
 * Internal Module dependencies.
 */

const spots = require('./spots');
const question = require('./question');
const question = require('./team');

/**
 * GameCreating
 */

dbUtil.newGame();

/**
 * Socket.io configuration
 */

socket.on('connection', (socket) => {
    winston.info('a user connected');
    socket.on('graphql', (message) => {
        graphql(schema, message, root).then((response) => {
             socket.emit('graphql', response);
        });
    });
});


/**
 * Start listen with the server
 */
const port = process.env.PORT || 8080;
server.listen(port, () => console.log('Express server listening on %d, in %s mode', port, app.get('env')));
