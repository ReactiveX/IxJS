'use strict';

var bindCallback = require('./internal/bindcallback');
var $iterator$ = require('./symbol').iterator;

function Iterable(source) {
  if (typeof source[$iterator$] !== 'function') {
    throw new TypeError('source must be iterable');
  }
  this._source = source;
}

Iterable.prototype[$iterator$] = function () {
  return this._source[$iterator$]();
};

Iterable.prototype.forEach = function (fn, thisArg) {
  var i = 0, it = this[$iterator$](), next, fun = bindCallback(fn, thisArg, 2);
  while (!(next = it.next()).done) {
    fun(next.value, i++);
  }
};

module.exports = Iterable;
