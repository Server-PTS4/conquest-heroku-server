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
  if (value.length == dataKey.length) {
    for (var i = 0; i < dataKey.length; i++) {
      for(var a in value) {
      //let dataChange = getValue(dataKey[i]);
      //dataChange.dataKey = value[i];
      //db.get(dataClass).find(getValue(dataKey)).assign(dataChange).value();
      }
    }
  } else {
    console.log("Error : nombre of values is different between value and title");
  }
}

function getValueUsed(dataClass, dataUsed, dataKey) {
  let list = [];

  if(typeof dataKey === 'undefined') {
    _.each(db.get(dataClass).value(), function (value, key) {
      list.push(transformJSON(value, dataUsed));
    });
  } else {
    _.each(db.get(dataClass).find({ name: dataKey }).value(), function (value, key) {
      list.push(transformJSON(value, dataUsed));
    });
  }

  return JSON.stringify(list);
}

function transformJSON(value, dataUsed) {
  var result = [];

  for(var a in value)
    for(var i = 0; i < dataUsed.length; i++)
      if(a == dataUsed[i])
        result.push(value [a]);

  return result;
}

exports.getValue = getValue;
exports.verifClass = verifClass;
exports.getValueUsed = getValueUsed;
exports.setValue = setValue;
