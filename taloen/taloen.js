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
	//let listKey = ["player", "name"];
	//let listValue = [["jerem", 0, 0, null], "Red"]
	//console.log(classe.setValue(query, listKey, listValue));

	winston.info('getData() called with query: ' + query);

	if(query == "{team{*player}}")
		data += team.getTeamObject(players);
	if(query == "{team}")
		return funct.getTeamList();
  if(query == "{spot}")
		return funct.getSpotList();
	if(query == "{endTime}")
		return funct.getEndTime();
	if(query == "{team spot}") {
		data += funct.getTeamList() + ",";
		data += funct.getSpotList();
	}
	if (query == "{question}")
		return funct.getQuestionRandom();
	if(query == '{spot:"Dormerie"{state}}')
		return statement(2);
	if(query == '{spot:"Parking"{state}}')
		return statement(1);
	if(query == '{spot:"Département Informatique"{state}}')
		return statement(0);


	winston.info('LISTE :' + data);

	//query = stringifyQuery(query);

    //convert.verifSyntax(query);

	//if (data == "") {
	//	data = "error";
	//}
	return data;
}

function statement(index) {
	var value = classe.getValue('team')
	for (var i in value) {
		if (i == 0) {
			var spotValue = value[i].spot;
			for (var a in spotValue) {
				if (a == index)
				 return spotValue[a].state;
			}
		}
	}
}

exports.getData = getData;
