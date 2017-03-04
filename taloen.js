/**
 * TalOen is a self created API designed like GraphQL API used to get data quickly and easily
 */

/**
 * External Module dependencies.
 */
const winston = require('winston');

function getData(query) {
	let data = "";

	query = '{ test Spot: "Dormerie" { latitude longitude } essai Player {name} hello { world { alan turing amd ryzen { intel egal merde } } } try}';

	query = stringifyQuery(query);

	if (isSyntaxCorrect(query)) {
		let queryArguments = getArguments(query);
		// Parse arguments
		parseArgument(queryArguments);
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
		if (query.charAt(query.length - 1) == '}') {
			let nbBracketsOpened = 0;
			let nbQuotesOpened = 0;
			let placeOfFirstQuoteBadSyntax = 0;

			for (let i = 0; i < query.length; i++) {
				switch (query.charAt(i)) {
					case '{':
						nbBracketsOpened++;
						break;
					case '}':
						nbBracketsOpened--;
						break;
					case '"':
						if (nbQuotesOpened < 0) {
							nbQuotesOpened++;
						} else {
							nbQuotesOpened--;
						}
						
						if (query.charAt(i - 1) != ':' && nbQuotesOpened < 0 && placeOfFirstQuoteBadSyntax == 0) {
							placeOfFirstQuoteBadSyntax = i;							
						}
						break;
				}
			}

			if (nbQuotesOpened != 0) {
				winston.error('Syntax error on query:\n' + query + '\nNot all the quotes are closed starting at: ' + query.substring(query.indexOf('"'), query.length));
				return false;
			} else {
				// TODO indexOf => probleme, il ne renvoie pas la bonne place
				winston.error('Syntax error on query:\n' + query + '\nExpected ":" before: "' + query.substring(placeOfFirstQuoteBadSyntax + 1, query.length)
								.substring(0, query.indexOf('"')));
							return false;
			}

			for (let i = 0; i < query.length; i++) {
				if (nbBracketsOpened != 0) {
					// TODO
					if (nbBracketsOpened > 0) {
						expectedChar = '}';
						foundChar = '';	
						winston.error('Syntax error on query:\n' + query + '\nExpected ' + expectedChar + ' found ' + foundChar + ' instead');
						return false;
					} else {
						if (query.charAt(i)) {
						}
						expectedChar = '{';
						foundChar =  '';
						winston.error('Syntax error on query:\n' + query + '\nExpected ' + expectedChar + ' found ' + foundChar + ' instead');
						return false;
					}
				}
			}
		} else {
			// Syntax error: should end with a '}'
			winston.error('Syntax error on query:\n' + query + '\nExpected } at end of query. Found ' + query.charAt(query.length - 1) + ' instead');
			return false;
		}
	} else {
		// Syntax error: should start with a '{'
		winston.error('Syntax error on query:\n' + query + '\nExpected { at start of query. Found  ' + query.charAt(0) + ' instead');
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
        }
        if (query.charAt(i) == '}') {
            nbBrackets--;
            if (nbBrackets == 0) {
                queryArguments.push(argument);
                argument = "";
            }
        }
        if (query.charAt(i) == ' ' && query.charAt(i - 1) != '}') {
            if (nbBrackets == 0) {
                queryArguments.push(argument);
                argument = "";
            }
        }
    }

    if (argument != "") {
    	queryArguments.push(argument);
    }

	return queryArguments;
}

function parseArgument(args) {
	for (i in args) {
		winston.info(args[i]);
		if (doArgumentExists(args[i])) {

		}
	}	
}

function doArgumentExists(argument) {
	return true;
}

function searchFor(object, id) {

}

exports.getData = getData;