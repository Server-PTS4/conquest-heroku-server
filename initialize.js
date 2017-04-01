/**
 * initialize.js is a file to initialize the game
 */

/**
 * External Module dependencies.
 */
const _ = require('lodash');
//Database
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

// Create a new Game
function newGame() {
	db.defaults({ team: [] }).value();
	db.defaults({ question: [] }).value();
	initializeTeam();
	resetSpots();
	//endTime();
}

// Initialize team to new Game
function initializeTeam() {
	_.each(db.get('team').value(), function (value, key) {
			value.player = [];
			value.score = 0;
			value.questionTried = 0;
	});
}

// Reset spots to initialize the Game
function resetSpots() {
  _.each(db.get('spot').value(), function (value, key) {
    value.status="Neutral";
  });
}

// Reset spots to initialize the Game
function endTime() {
	_.each(db.value(), function (value, key) {
		if (key == 'endTime')
    	value = "";
  });
}

/**
 * Export the function to initialize the game
 */
exports.newGame = newGame;
exports.resetSpots = resetSpots;
