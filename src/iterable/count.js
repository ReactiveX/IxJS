'use strict';

var identity = require('../internal/identity');
var $iterator$ = require('../symbol').iterator;

module.exports = function count (source, fn) {
  fn || (fn = identity);
  var it = source[$iterator$], next, i = 0;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { i++; }
  }
  return i;
};