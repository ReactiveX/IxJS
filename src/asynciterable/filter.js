'use strict';

var AsyncIterableImpl = require('../asynciterable');
var AsyncIteratorImpl = require('../asynciterator');
var $asyncIterator$ = require('../symbol').asyncIterator;
var bindCallback = require('../internal/bindcallback');
var inherits = require('inherits');

function AsyncFilterIterator(it, fn) {
  AsyncIterator.call(this);
  this._it = it;
  this._fn = fn;
  this._i = 0;
}

inherits(AsyncFilterIterator, AsyncIterator);

AsyncFilterIterator.prototype._next = function () {
  var self = this;
  function recurse() {
    self._it.next().then(function (next) {
      if (next.done) { return self._settle('return', next.value); }
      if (self._fn(next.value, self._i++)) {
        self._settle('normal', next.value);
      } else {
        recurse();
      }
    }).catch(function (error) {
      self._settle('throw', error);
    });
  }

  recurse();
};

function AsyncFilterIterable(source, fn, thisArg) {
  AsyncIterable.call(this);
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
}

inherits(AsyncFilterIterable, AsyncIterable);

AsyncFilterIterable.prototype[$asyncIterator$] = function () {
  return new AsyncFilterIterator(this._source[$asyncIterator$](), this._fn);
};

function innerPredicate(fn, self) {
  return function(x, i) { return self._fn(x, i) && fn.call(this, x, i); };
}

AsyncFilterIterable.prototype.internalFilter = function(fn, thisArg) {
  return new AsyncFilterIterable(this._source, innerPredicate(fn, this), thisArg);
};

module.exports = function filter (source, fn, thisArg) {
  return source instanceof AsyncFilterIterable ?
    source.internalMap(fn, thisArg) :
    new AsyncFilterIterable(source, fn, thisArg);
};
