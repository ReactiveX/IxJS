'use strict';

var $iterator$ = require('../symbol').iterator;

function reduceFn (source, func, seed) {
  var accumulate = seed, iterator = source[$iterator$](), i = 0;
  while (1) {
    var next = iterator.next();
    if (next.done) { return accumulate; }
    accumulate = func(accumulate, next.value, i++, source);
  }
}

function reduceFn1 (source, func) {
  var iterator = source[$iterator$](), i = 0, next = iterator.next();
  if (next.done) {
    throw new TypeError('Sequence contains no elements');
  }
  var accumulate = next.value;

  while (1) {
    next = iterator.next();
    if (next.done) { return accumulate; }
    accumulate = func(accumulate, next.value, i++, source);
  }
}

module.exports = function reduce (/* source, fn, seed */) {
  var source = arguments[0], fn = arguments[1];
  if (arguments.length === 3) {
    return reduceFn(source, fn);
  } else if (arguments.length === 2) {
    return reduceFn1(source, fn, arguments[2]);
  } else {
    throw new Error('Invalid arguments');
  }
};
