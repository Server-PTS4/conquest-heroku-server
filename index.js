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
const classe = require('./taloen/classe');
const teamHandler = require('./team');

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
    var clientIp = socket.request.connection.remoteAddress;
    console.log(clientIp);

    socket.on('isAlive', (message) => {
        if (message == "alan") {
            socket.emit('isAlive', "turing");
        }
    });

    socket.on('getData', (message) => {
      winston.info('JSON: ' + JSON.stringify(funct.getAll()));
    	socket.emit('getData', taloen.getData(message));
    });

    socket.on('newPlayer', (message) => {
      winston.info("New player with username: '" + JSON.parse(message).username + "' and preferedTeam: '" + JSON.parse(message).preferedTeam + "'");
    	socket.emit('newPlayer', funct.addPlayer(JSON.parse(message).username, JSON.parse(message).preferedTeam));
      if (funct.getPlayerList().length == 2) {
        dateEndGame = new Date(new Date().getTime() + 240000);
        funct.setEndTime(dateEndGame);
        winston.info('Sending startGame with date end game: ' + dateEndGame);
        socket.broadcast.emit('startGame', JSON.stringify(dateEndGame));
        socket.emit('startGame', JSON.stringify(dateEndGame));
      }
      if (funct.getPlayerList().length > 2) {
        winston.info('Broadcast update to clients, cause : newPlayer');
        socket.broadcast.emit('update', "update");
      }
      if (funct.getPlayerList().length >= 2) {
          setInterval(function() {
            winston.info('Broadcast update to clients, cause : state change');
            socket.broadcast.emit('update', "update");
          }, 30000 );
      }
    });

    socket.on('changePosition', (message) => {
        winston.info(message);
        const player = JSON.parse(JSON.stringify(message));
        winston.info('the player '+player.username+' changer this position to lat:'+player.latitude+' and long: '+player.longitude);
        funct.changePlayerPosition(player.username, player.latitude, player.longitude);
    });
    socket.on('answerQuestion', (message) => {
        const questionResult = JSON.parse(JSON.stringify(message));
        winston.info('the player '+questionResult.username+' as answered to the question : '+questionResult.title+' and his result is '+questionResult.result);
        teamHandler.answerToQuestion(questionResult.username, questionResult.result, questionResult.title, questionResult.spotName);
        winston.info('broadcast update to client, cause : a player answered a question');
        const win = classe.verifIfTeamWin();
        if(win!="Neutral") {
            winston.info('update', "update, cause : team "+win+" win the game!");
            socket.broadcast.emit('gamefinish', win);
            socket.broadcast.emit('update', "update");
        } else {
	    socket.broadcast.emit('update', "update");
	}
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
