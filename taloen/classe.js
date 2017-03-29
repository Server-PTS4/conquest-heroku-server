/**
 * Classe is a file to verify if class give in query exist
 */
const _ = require('lodash');
//DataBase
const low = require('lowdb');
const fileSync = require('lowdb/lib/file-sync');
const db = low('db.json', { storage: fileSync });

function verifClass(dataClass) {
  let list = db.value();
  console.log(list.length);
  for (var i = 0; i < list.length; i++)
    if (list[i] == dataClass)
      return true

  return false
}

function getValue(dataClass, dataKey) {
  if (typeof dataKey === 'undefined')
    return db.get(dataClass).value();
  return db.get(dataClass).find({ name: dataKey}).value();
}

function setValue(dataClass, dataTitle, value, dataKey) {
  if (typeof dataKey === 'undefined') {
    if (value.length == dataTitle.length) {
      for (var i = 0; i < list.length; i++) {
        let dataChange = getValue(dataTitle[i]);
        dataChange.dataTitle = value[i];
        db.get('dataClass').find(getValue(dataTitle)).assign(dataChange).value();
      }
    } else {
      console.log("Error : nombre of values is different between value and title");
    }
  } else {

  }
}

function getValueExclusion(dataClass, exclusion, dataKey) {
	if(typeof dataKey === 'undefined') {
    let listExclusion = exclusion;
    let listClass = dataClass.value();
    for(var i = 0; i < listClass.length; i++) {

    }
  }
}

exports.getValue = getValue;
exports.verifClass = verifClass;