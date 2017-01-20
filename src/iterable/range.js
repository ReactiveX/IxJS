'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function RangeIterator(start, count) {
  this._current = start - 1;
  this._end = start + count - 1;
  Iterator.call(this);
}

inherits(RangeIterator, Iterator);

RangeIterator.prototype.next = function () {
  return this._current++ < this._end ?
    { done: false, value: this._current } :
    doneIterator;
};

function RangeIterable(start, count) {
  this._start = start;
  this._count = count;
  Iterable.call(this);
}

inherits(RangeIterable, Iterable);

RangeIterable.prototype[$iterator$] = function () {
  return new RangeIterator(this._start, this._count);
};

module.exports = function range(start, count) {
  return new RangeIterable(start, count);
};
