/**
 * function.js is a class to develop function only used by developpers
 */
const _ = require('lodash');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

const team = require('./../team');
const spot = require('./../spot');

// Function to verify if a team win the game
function verifIfTeamWin() {
  let a = 0, b = 0, c = null;

  _.each(db.get('spots').value(), function (value, key) {
    if (c == null) { c = value.status;}
    if (value.status == c) { b++; }
    a++;
  });

  return (a == b) ? c : "Neutral";
}

// Function to choose a random question
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Getter of question
function getQuestionRandom() {
    return db.get('question').value()[getRandom(0, db.get('question').value().length - 1)];
}

function newPlayer(query) {
	team.addPlayer(JSON.parse(query).preferedTeam, JSON.parse(query).username);
}

exports.newPlayer = newPlayer
exports.getQuestionRandom = getQuestionRandom
exports.verifIfTeamWin = verifIfTeamWin


/**
 * Add player
 */
 function addPlayer(teamName, player) {
     if(playerFinder(player)!=null) {
         winston.error("A Player have tried to choose an username that is already in database!");
         return false;
     }
     if(db.get('team').find({ name: "Red" }).value().players.length == db.get('team').find({ name: "Green" }).value().players.length) {
         db.get('team').find({ name: teamName }).assign(db.get('team').find({ name: teamName }).value().players.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     }
     if(db.get('team').find({ name: "Red" }).value().players.length > db.get('team').find({ name: "Green" }).value().players.length) {
         db.get('team').find({ name: "Green" }).assign(db.get('team').find({ name: "Green" }).value().players.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     } else if(db.get('team').find({ name: "Red" }).value().players.length < db.get('team').find({ name: "Green" }).value().players.length) {
         db.get('team').find({ name: "Red" }).assign(db.get('team').find({ name: "Red" }).value().players.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     } else {
         db.get('team').find({ name: teamName }).assign(db.get('team').find({ name: teamName }).value().players.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     }
 }
 exports.addPlayer = addPlayer;


 function answerToQuestion(playerUsername, result, title, spotTitle) {
     const teamName = playerTeamFinder(playerUsername).name;
     const team = db.get('team').find({name: teamName}).value();
     const player = playerFinder(playerUsername);
     if(result) {
         team.score += 1;
         player.score += 1;
     }
     team.numberQuestionTried += 1;
     player.numberQuestionTried += 1;
     db.get('team').find({name: teamName}).assign(team).value();
     spots.spotChangeStatus(spotTitle,team.name)
 }
 exports.answerToQuestion = answerToQuestion;

 // Useless, Can be usefull latitudeer
 function changePlayerScore(playerUsername, score) {
     const teamName = playerTeamFinder(playerUsername).name;
     const team =  db.get('team').find({ name: teamName}).value();
     team.score += score;
     playerFinder(playerUsername).score += score;
     db.get('team').find({ name: teamName}).assign(team).value();
 }
 exports.changePlayerScore = changePlayerScore;

 function changePlayerPosition(playerUsername, latitude, longitude) {
     const teamName = playerTeamFinder(playerUsername).name;
     const team =  db.get('team').find({ name:teamName}).value();
     let player = _.find(team.players, function (player) {
         return player.username=playerUsername;
     });
     player.latitude = latitude;
     player.longitude= longitude;
     db.get('team').find({ name: teamName}).assign(team).value();
 }
 exports.changePlayerPosition = changePlayerPosition;

 function playerFinder(playerUsername) {
     let resultForEach=null;
     _.each(db.get('team').value(), function (team) {
         const result =_.find(team.players, function (obj) {
             return playerUsername==obj.username;
         });
         if(result!=null)  {
             resultForEach=result;
         }
     });
     return resultForEach;
 }


 function playerTeamFinder(playerUsername) {
     let resultForEach=null;
     _.each(db.get('team').value(), function (team) {
         const result =_.find(team.players, function (obj) {
             return playerUsername==obj.username;
         });
         if(result!=null)  {
             resultForEach=team;
         }
     });
     return resultForEach;
 }

 function getPlayerList() {
     let list = [];

     _.each(db.get('team').value(),function (team) {
         _.each(team.players, function (player) {
             player.team= team.name;
             list.push(player);
         })
     });

     return list;
 }
 exports.getPlayerList = getPlayerList;
