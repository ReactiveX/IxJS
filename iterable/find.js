'use strict';

var bindCallback = require('../internal/bindcallback');
var isFunction = require('../internal/isfunction');
var $iterator$ = require('../symbol').iterator;

module.exports = function find (source, predicate, thisArg) {
  if (!isFunction(predicate)) { throw new TypeError(); }
  var fn = bindCallback(predicate, thisArg, 2);
  var index = 0, iterable = source[$iterator$]();
  while (1) {
    var next = iterable.next();
    if (next.done) { return undefined; }
    if (fn(next.value, index)) { return next.value;  }
    index++;
  }
};