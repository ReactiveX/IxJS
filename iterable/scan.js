'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function ScanIterator(it, fn, hasSeed, seed) {
  this._it = it;
  this._fn = fn;
  this._hs = hasSeed;
  this._v = seed;
  Iterator.call(this);
}

inherits(ScanIterator, Iterator);

ScanIterator.prototype.next = function () {
  var next;
  if (!this._hs) {
    next = this._it.next();
    if (next.done) { return doneIterator; }
    this._hs = true;
    this._v = next.value;
  }
  next = this._it.next();
  if (next.done) { return doneIterator; }
  this._v = this._fn(this._v, next.value);
  return { done: false, value: this._v };
};

function ScanIterable(source, fn, hasSeed, seed) {
  this._source = source;
  this._fn = fn;
  this._hs = hasSeed;
  this._s = seed;
  Iterable.call(this);
}

inherits(ScanIterable, Iterable);

ScanIterable.prototype[$iterator$] = function () {
  return new ScanIterable(this._source[$iterator$](), this._fn, this._hs, this._s);
};

module.exports = function scan(/* accumulator, seed */) {
  var source = arguments[0], fn = arguments[1];
  if (arguments.length === 3) {
    return new ScanIterable(source, fn, true, arguments[2]);
  } else if (arguments.length === 2) {
    return new ScanIterable(source, fn, false);
  } else {
    throw new Error('Invalid arguments');
  }
};
