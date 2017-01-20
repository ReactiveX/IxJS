'use strict';

var $iterator$ = require('../symbol').iterator;

module.exports = function isEmpty (source) {
  var it = source[$iterator$], next;
  while (!(next = it.next()).done) {
    return false;
  }
  return true;
};