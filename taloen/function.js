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
const winston = require('winston');

/*const fs = require('fs');

function readFile() {
  let file = fs.readFileSync('db.json', 'utf8')
  return JSON.stringify(JSON.parse(file));
}*/

function setEndTime(endTime) {
  db.get('endTime').assign(JSON.stringify(endTime)).value();
}

function getEndTime() {
  return db.get('endTime').value();
}

// Function to verify if a team win the game
function verifIfTeamWin() {
  let a = 0, b = 0, teamName = null;

  _.each(db.get('spots').value(), function (value, key) {
    if (teamName == null) { teamName = value.status;}
    if (value.status == teamName) { b++; }
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

exports.getQuestionRandom = getQuestionRandom
exports.verifIfTeamWin = verifIfTeamWin
exports.readFile = readFile;


/**
 * Add player
 */
 function addPlayer(player, teamName) {
     if(playerFinder(player)!=null) {
         winston.error("A Player have tried to choose an username that is already in database!");
         return false;
     }
     if(db.get('team').find({ name: "Red" }).value().player.length == db.get('team').find({ name: "Green" }).value().player.length) {
         db.get('team').find({ name: teamName }).assign(db.get('team').find({ name: teamName }).value().player.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     }
     if(db.get('team').find({ name: "Red" }).value().player.length > db.get('team').find({ name: "Green" }).value().player.length) {
         db.get('team').find({ name: "Green" }).assign(db.get('team').find({ name: "Green" }).value().player.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     } else if(db.get('team').find({ name: "Red" }).value().player.length < db.get('team').find({ name: "Green" }).value().player.length) {
         db.get('team').find({ name: "Red" }).assign(db.get('team').find({ name: "Red" }).value().player.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     } else {
         db.get('team').find({ name: teamName }).assign(db.get('team').find({ name: teamName }).value().player.push({
             username: player,
             numberQuestionTried: 0,
             score : 0,
             latitude : 0,
             longitude : 0
         })).value();
         return true;
     }
     winston.error("Aucun if de addPlayer n'a pu supporter les argument en entree");
     return false;
 }
 exports.addPlayer = addPlayer;

 // Getter of team list
 function getTeamList() {
     return db.get('team').value();
 }
 exports.getTeamList = getTeamList;

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
 function changeplayercore(playerUsername, score) {
     const teamName = playerTeamFinder(playerUsername).name;
     const team =  db.get('team').find({ name: teamName}).value();
     team.score += score;
     playerFinder(playerUsername).score += score;
     db.get('team').find({ name: teamName}).assign(team).value();
 }
 exports.changeplayercore = changeplayercore;

 function changePlayerPosition(playerUsername, latitude, longitude) {
     const teamName = playerTeamFinder(playerUsername).name;
     const team =  db.get('team').find({ name:teamName}).value();
     let player = _.find(team.player, function (player) {
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
         const result =_.find(team.player, function (obj) {
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
         const result =_.find(team.player, function (obj) {
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
         _.each(team.player, function (player) {
             player.team= team.name;
             list.push(player);
         })
     });

     return list;
 }
 exports.getPlayerList = getPlayerList;


 function getSpotList() {
     return db.get('spot').value();
}
 exports.getSpot = getSpot;
