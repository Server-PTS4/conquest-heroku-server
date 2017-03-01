/**
 * Created by lucas on 15/02/2017.
 */

var { graphql, buildSchema } = require('graphql');
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

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

/**
 * Socket.io
 */
socket.on('connection', (socket) => {
    winston.info('A user connected');
    
    socket.on('disconnection', (message) => {
        winston.info(message);
        winston.info('A user disconnected');
    });
    
    socket.on('isAlive', (message) => {
        graphql(schema, message, root)
            .then((response) => { emit(response); })
            .catch(err => winston.info(err));                  
    });
});

function emit(res) {
    res = JSON.stringify(res, null, 2);
    winston.info(res);
    socket.emit('isAlive', res);
}
/**
 * Start listen with the server
 */
const port = process.env.PORT || 80;
server.listen(port, () => console.log('Express server listening on %d, in %s mode', port, app.get('env')));
