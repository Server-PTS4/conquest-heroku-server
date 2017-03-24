/**
 * External Module dependencies.
 */
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

// Function to choose a random question
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Getter of question with a title to key
function getQuestion(title) {
    return db.get('question').find({ title: title }).value();
}

// Getter of question
function getQuestionRandom() {
    return db.get('question').value()[getRandom(0, db.get('question').value().length - 1)];
}

/**
 * Export the function
 */
exports.getQuestion = getQuestion;
exports.getQuestionRandom = getQuestionRandom;
