/**
 * Classe is a file to verify if class give in query exist
 */
const _ = require('lodash');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

function verifClass(dataClass) {
  let exist = false;

  _.each(db.value(), function (value, key) {
    if (key == dataClass) exist = true;
  });

  return exist;
}

function getValue(dataClass, dataKey) {
  if (typeof dataKey === 'undefined')
    return db.get(dataClass).value();
  return db.get(dataClass).find({ name: dataKey}).value();
}

function setValue(dataClass, dataKey, value) {
  if (value.length == dataTitle.length) {
    for (var i = 0; i < list.length; i++) {
      let dataChange = getValue(dataKey[i]);
      dataChange.dataKey = value[i];
      db.get(dataClass).find(getValue(dataKey)).assign(dataChange).value();
    }
  } else {
    console.log("Error : nombre of values is different between value and title");
  }
}

function getValueExclusion(dataClass, exclusion, dataKey) {
  let list = [];
  let listExclusion = exclusion;

  for(var i = 0; i < listExclusion.length; i++) {
    if(typeof dataKey === 'undefined') {
      _.each(db.get(dataClass).value(), function (value, key) {
        console.log(value.name);
        if(key != listExclusion[i]) list.push();
      });
    } else {
      _.each(db.get(dataClass).find({ name: dataKey }).value(), function (value, key) {
        if(key != listExclusion[i]) list.push(key);
      });
    }
  }
  return list;
}

exports.getValue = getValue;
exports.verifClass = verifClass;
exports.getValueExclusion = getValueExclusion;
exports.setValue = setValue;
