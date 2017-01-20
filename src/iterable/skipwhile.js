'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal')
var inherits = require('inherits');

function SkipWhileIterator(it, fn) {
  this._it = it;
  this._fn = fn;
  this._i = 0;
  this._skipped = false;
  Iterator.call(this);
}

inherits(SkipWhileIterator, Iterator);

SkipWhileIterator.prototype.next = function () {
  var next;
  if (!this._skipped) {
    while(1) {
      next = this._it.next();
      if (next.done) { return { done: true, value: next.value }; }
      if (!this._fn(next.value, this._i++)) {
        return { done: false, value: next.value };
      }
    }
    this._skipped = true;
    next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
    return { done: false, value: next.value };
  }
};

function SkipWhileIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  Iterable.call(this);
} 

inherits(SkipWhileIterable, Iterable);

SkipWhileIterable.prototype[$iterator$] = function () {
  return new SkipWhileIterable(this._source, this._fn);
};

module.exports = function skipWhile (source, fn, thisArg) {
  return new SkipWhileIterable(source, fn, thisArg);
};
