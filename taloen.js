/**
 * TalOen is a self created API designed like GraphQL API used to get data quickly and easily
 */

/**
 * External Module dependencies.
 */
const winston = require('winston');

function getData(query) {
	let data = "";

	//query = '{	Spot: "Dormerie" {		latitude		longitude	}	Player {name}	hello {		world {			alan			turing			amd			ryzen {				intel				egal				merde			}		}	}}';

	query = stringifyQuery(query);
	winston.info(query);

	if (isSyntaxCorrect(query)) {
		let queryArguments = getArguments(query);
		// Parse arguments
		parseArgument(query);
	}

	if (data == "") {
		data = "error";
	}
	return data;
}

function stringifyQuery(query) {
	query = query.toLowerCase();

	for (let i = 0; i < query.length; i++) {
		// Si on a un retour à la ligne ou une tabulation alors on le remplace par un espace
		if (query.charAt(i) == '\n' || query.charAt(i) == '\t') {
			query = replaceCharAt(query, i, ' ');
			i--;
		}

		// Si on a un espace suivi soit d'un '{' ou '}' ou précédé de '{' ou ':' alors on le supprime
		if (query.charAt(i) == ' ' && (query.charAt(i + 1) == '{' || query.charAt(i + 1) == '}'
			|| query.charAt(i + 1) == ' ' || query.charAt(i - 1) == '{' || query.charAt(i - 1) == ':')) {
			query = replaceCharAt(query, i, '');
			i--;
		}
	}

	return query;
}

function isSyntaxCorrect(query) {
	if (query.charAt(0) == '{') {
		// TODO
	} else {
		// Syntax error: should start with a '{'
		let expectedChar = '{';
		let foundChar = query.charAt(0);
		let errorMessage = 'Syntax error on query:\n' + query + '\nAt line 1: expected "' + expectedChar + '" found "' + foundChar + '" instead';
		winston.error(errorMessage);
		return false;
	}
	return true;
}

function replaceCharAt(string, index, char) {
	return string.substring(0, index) + char + string.substring(index + 1, string.length);
}

function getArguments(query) {
	let queryArguments = [];
	query = query.substring(1, query.length - 1);
    let argument = "";
    let nbBrackets = 0;
    for (let i = 0; i < query.length; i++) {
        argument += query.charAt(i);
        if (query.charAt(i) == '{') {
                nbBrackets++;
        } else if (query.charAt(i) == '}') {
            nbBrackets--;
            if (nbBrackets == 0) {
                queryArguments.push(argument);
                argument = "";
            }
        }
    }
    
    winston.info(queryArguments);
	return queryArguments;
}

function parseArgument(arg) {
	const argument = "";
	if (doArgumentExists(argument)) {}
}

function doArgumentExists(argument) {

}

function searchFor(object, id) {

}

exports.getData = getData;