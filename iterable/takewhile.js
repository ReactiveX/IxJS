'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback')
var inherits = require('inherits');

function TakeWhileIterator(it, fn) {
  this._it = it;
  this._fn = fn;
  this._i = 0;
  Iterator.call(this);
}

inherits(TakeWhileIterator, Iterator);

TakeWhileIterator.prototype.next = function () {
  var next = this._it.next();
  if (next.done) { return { done: true, value: next.value }; }
  if (!this._fn(next.value, this._i++)) {
    return { done: true, value: next.value };
  } else {
    return { done: false, value: next.value };
  }
};

function TakeWhileIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  Iterable.call(this);
}

inherits(TakeWhileIterable, Iterable);

TakeWhileIterable.prototype[$iterator$] = function () {
  return new TakeWhileIterable(this._source, this._fn);
};

module.exports = function takeWhile(source, fn, thisArg) {
  return new TakeWhileIterable(source, fn, thisArg);
};
