'use strict';

var bindCallback = require('./internal/bindcallback');
var $iterator$ = require('./symbol').iterator;

function Iterable(source) {
  if (source && typeof source[$iterator$] !== 'function') {
    throw new TypeError('Source must support Symbol.iterator');
  }
  this._source = source
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

Iterable.addToObject = function (operators) {
  Object.keys(operators).forEach(function (operator) {
    Iterable[operator] = operators[operator];
  });
};

Iterable.addToPrototype = function (operators) {
  Object.keys(operators).forEach(function (operator) {
    Iterable.prototype[operator] = function () {
      var args = [this];
      args.push.apply(args, arguments);
      return operators[operator].apply(null, args);
    };
  });
};

module.exports = Iterable;
