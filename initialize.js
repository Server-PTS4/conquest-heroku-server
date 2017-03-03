/**
 * External Module dependencies.
 */
//Database
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });
const _ = require('lodash');

// Create a new Game
function newGame() {
	initializeTeam();
	resetSpots();
}

// Initialize team to new Game
function initializeTeam() {
	console.log(db.value());
	var json = '{"users":{"test1":{},"test2":{}}}';
	var obj  = JSON.parse(json);
	var newuser = 'test3';
	console.log(newuser);
	obj.users[newuser] = {};
	console.log(JSON.stringify(obj));
}

// Reset spots to initialize the Game
function resetSpots() {
    _.each(db.get('spots').value(), function (value, key) {
        value.status="Neutral";
    });
}

exports.newGame = newGame;
exports.resetSpots = resetSpots;