/**
 * TalOen is a self created API designed like GraphQL API used to get data quickly and easily
 */

/**
 * External Module dependencies.
 */
 const winston = require('winston');

function getData(query) {
	let data = "";

	if (query.charAt(0) == '{') {
		// Parse first argument
		parseArgument(query);
	} else {
		// Syntax error: should start with a '{'
		let expectedChar = '{';
		let foundChar = query.charAt(0);
		let errorMessage = 'Syntax error on query:\n' + query + '\nAt line 1: expected "' + expectedChar + '" found "' + foundChar + '" instead';
		winston.error(errorMessage);
	}

	if (data == "") {
		data = "error";
	}
	return data;
}

function parseArgument(message) {

}

function searchFor(object, id) {

}

exports.getData = getData;