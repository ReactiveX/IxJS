'use strict';

var $iterator$ = require('../symbol').iterator;

module.exports = function every (source, comparer) {
  var it = source[$iterator$], next, i = 0;
  while (!(next = it.next()).done) {
    if (!comparer(next, i++)) { return false; }
  }
  return true;
};
