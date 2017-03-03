/**
 * Created by charles on 10/01/2017.
 */

/**
 * External Module dependencies.
 */
//DataBase
const low = require('lowdb');
const winston = require('winston');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });
const _ = require('lodash');
const init = require('./initialize');


function getSpot(title) {
    return db.get('spots').find({ title: title }).value();
}
exports.getSpot = getSpot;

function spotChangeStatus(title, status) {
    const modifiedSpot = getSpot(title);
    modifiedSpot.status=status;
    db.get('spots').find(getSpot(title)).assign(modifiedSpot).value();
}
exports.spotChangeStatus = spotChangeStatus;

function verifIfTeamWin() {
    let redWin=true;
    let greenWin=true;
    _.each(db.get('spots').value(), function (value, key) {
        if(value.status!="Red") {
            redWin=false;
            winston.info('Not red spot info');
        }
        if(value.status!="Green") {
            greenWin=false;
            winston.info('Not green spot info');
        }
    });
    if(redWin) {
        init.resetSpots();
        return "Red"
    } else if(greenWin) {
        init.resetSpots();
        return "Green"
    }
    winston.info('Neutral spot info');
    return "Neutral"
}
exports.verifIfTeamWin = verifIfTeamWin;

function getSpotList() {
    return db.get('spots').value();
}
exports.getSpotList = getSpotList;
