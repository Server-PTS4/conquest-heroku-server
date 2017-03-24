/**
 * External Module dependencies.
 */
const _ = require('lodash');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });
// Print console
const winston = require('winston');
// Import of initialization to new Game
const init = require('./initialize');

// Function to change the status of the spot
function spotChangeStatus(title, status) {
  const spotChange = getSpot(title);
  spotChange.status = status;
  db.get('spot').find(getSpot(title)).assign(spotChange).value();
}

// Function to verify if a team win the game
function verifIfTeamWin() {
  let a = 0, b = 0, c = null;

  _.each(db.get('spot').value(), function (value, key) {
    if (c == null) { c = value.status;}
    if (value.status == c) { b++; }
    a++;
  });

  return (a == b) ? c : "Neutral";
}

// Getter of spot with a title to key
function getSpot(title) {
  return db.get('spot').find({ title: title }).value();
}

// Getter of spots
function getSpotList() {
    return db.get('spot').value();
}

/**
 * Export the function
 */
exports.getSpot = getSpot;
exports.spotChangeStatus = spotChangeStatus;
exports.verifIfTeamWin = verifIfTeamWin;
exports.getSpotList = getSpotList;
