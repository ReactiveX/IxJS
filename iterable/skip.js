'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function SkipIterator(it, count) {
  this._it = it;
  this._count = count;
  this._skipped = false;
  Iterator.call(this);
}

inherits(SkipIterator, Iterator);

SkipIterator.prototype.next = function () {
  var next;
  if (!this._skipped) {
    for (var i = 0; i < this._count; i++) {
      next = this._it.next();
      if (next.done) { return doneIterator; }
    }
    this._skipped = true;
  }
  next = this._it.next();
  if (next.done) { return doneIterator; }
  return { done: false, value: next.value };
};

function SkipIterable(source, count) {
  this._source = source;
  this._count = count;
  Iterable.call(this);
}

inherits(SkipIterable, Iterable);

SkipIterable.prototype[$iterator$] = function () {
  return new SkipIterator(this._source[$iterator$](), this._count);
};

module.exports = function skip (source, count) {
  +count || (count = 0);
  Math.abs(count) === Infinity && (count = 0);
  if (count < 0) { throw new RangeError(); }
  return new SkipIterable(source, count);
};
