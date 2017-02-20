/**
 * Created by lucas on 15/02/2017.
 */
const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
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

/**
 * Data of graphql
 */
const fields = {
  Alan: {
    type: GraphQLString,
    resolve: () => {
      return 'Turing'
    }
  }
};

/**
 * Schemo for graphql
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields
  })
});

/**
 * Socket.io
 */
socket.on('connection', (socket) => {
    socket.on('isAlive', (message) => {
      socket.emit(graphql(schema, message)
        .then(res => winston.info(JSON.stringify(res, null, 2)))
        .catch(err => winston.info(err)));
    });
});

/**
 * Start listen with the server
 */
const port = process.env.PORT || 80;
server.listen(port, () => console.log('Express server listening on %d, in %s mode', port, app.get('env')));
