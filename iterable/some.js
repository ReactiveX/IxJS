'use strict';

var $iterator$ = require('../symbol').iterator;

module.exports = function some (source, comparer) {
  var it = source[$iterator$], next, i = 0;
  while (!(next = it.next()).done) {
    if (comparer(next, i++)) { return true; }
  }
  return false;
};
