'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback');
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function FilterIterator(it, fn) {
  this._it = it;
  this._fn = fn;
  this._i = 0;
  Iterator.call(this);
}

inherits(FilterIterator, Iterator);

FilterIterator.prototype.next = function () {
  var next;
  while (!(next = this._it.next()).done) {
    if (this._fn(next.value, this._i++)) {
      return { done: false, value: next.value };
    }
  }
  return doneIterator;
};

function FilterIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  Iterable.call(this);
}

inherits(FilterIterable, Iterable);

FilterIterable.prototype[$iterator$] = function () {
  return new FilterIterator(this._source[$iterator$](), this._fn);
};

function innerPredicate(fn, self) {
  return function(x, i) { return self._fn(x, i) && fn.call(this, x, i); };
}

FilterIterable.prototype.internalFilter = function(fn, thisArg) {
  return new FilterIterable(this._source, innerPredicate(fn, this), thisArg);
};

module.exports = function filter (source, fn, thisArg) {
  return source instanceof FilterIterable ? source.internalFilter(fn, thisArg) :
    new FilterIterable(source, fn, thisArg);
};
