/**
 * function.js is a class to develop function only used by developpers
 */
const _ = require('lodash');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

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
