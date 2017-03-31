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
const funct = require('./function');

function getData(query) {
	let data = "";

	//It is to server timer
	//var date = new Date();
	//console.log(date);
	//let list = ["player"];
	//console.log(classe.getValueUsed(query, list));

	if(query == "{team{*player}}")
		data += team.getTeamObject(players);
	if(query == "{team}")
		return JSON.parse(classe.getValue()).team;
  if(query == "{spot}")
		return spot.getSpotList();
	if(query == "{team spot}") {
		data += team.getTeamList() + ",";
		data += spot.getSpotList();
	}

	winston.info('LISTE :' + data);

	//query = stringifyQuery(query);

    //convert.verifSyntax(query);

	//if (data == "") {
	//	data = "error";
	//}
	return data;
}

exports.getData = getData;
