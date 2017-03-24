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


const team = require('./../team');
const spot = require('./../spot');

function getData(query) {
	let list = "";
	
	if(query == "{team{*player}}")
		list += team.getTeamObject(players);
	if(query == "{team}")
		list += team.getTeamList();
        if(query == "{spot}")
		list += spot.getSpotList();
	if(query == "{ spot team }") {
		list += spot.getSpotList() + ",";
		list += team.getTeamList();
	}
	
	//query = stringifyQuery(testQuery());
    
    //convert.verifSyntax(query);

	//if (data == "") {
	//	data = "error";
	//}
	return list;
}

function testQuery() {
    return '{ test Spot: "Dormerie" { latitude longitude } essai Player {name} hello { world { alan turing amd ryzen { intel egal merde } } } try}';
}

exports.getData = getData;
