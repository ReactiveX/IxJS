'use strict';

var $iterator$ = require('../symbol').iterator;

function comparer(a, b) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}

module.exports = function includes (source, searchElement, fromIndex) {
  var n = +fromIndex || 0, i = 0, it = source[$iterator$](), next;
  Math.abs(n) === Infinity && (n = 0);
  while (!(next = it.next()).done) {
    if (n > i++ && comparer(next.value, searchElement)) { return true;}
  }
  return false;
};
