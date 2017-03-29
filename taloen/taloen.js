/**
 * TalOen is a self created API designed like GraphQL API used to get and set data quickly and easily
 */

/**
 * External Module dependencies.
 */
const _ = require('lodash');
// Print console
const winston = require('winston');
// Class for TalOen
const convert = require('./convertTL');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

const classe = require('./classe');
const team = require('./../team');
const spot = require('./../spot');

function getData(query) {
	let data = "";

	classe.verifClass();

	winston.info(classe.getValue(query).length);
	winston.info(classe.getValue(query, "Neutral"));

	if(query == "{team{*player}}")
		data += JSON.stringifyQuery(team.getTeamObject(players));
	if(query == "{team}")
		data += JSON.stringifyQuery(team.getTeamList());
    if(query == "{spot}")
		data += JSON.stringifyQuery(spot.getSpotList());
	if(query == "{team spot}") {
		data += JSON.stringifyQuery(team.getTeamList() + ",");
		data += JSON.stringifyQuery(spot.getSpotList());
	}

	winston.info('LISTE :' + data);

	//query = stringifyQuery(query);

    //convert.verifSyntax(query);

	//if (data == "") {
	//	data = "error";
	//}
	return data;
}

function newPlayer(query) {
		query = JSON.parse(query);
		winston.info(query);
		var a = query.username;
		winston.info(a);
		var b = query.preferedTeam;
		winston.info(b);
}

exports.newPlayer = newPlayer
exports.getData = getData;
