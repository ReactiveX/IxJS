'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneiterator');
var inherits = require('inherits');

function RepeatValueIterator(value, count, hasCount) {
  this._value = value;
  this._count = count;
  this._hasCount = hasCount;
  Iterator.call(this);
}

inherits(RepeatValueIterator, Iterator);

RepeatValueIterator.prototype.next = function () {
  if (this._count !== 0) {
    this._hasCount && this._count--;
    return { value: this._value, done: false };
  } else {
    return doneIterator;
  }
};

function RepeatValueIterable(value, count, hasCount) {
  this._value = value;
  this._count = count;
  this._hasCount = hasCount;
  Iterable.call(this);
}

inherits(RepeatValueIterable, Iterable);

RepeatValueIterable.prototype[$iterator$] = function () {
  return new RepeatValueIterator(this._value, this._count, this._hasCount);
};

module.exports = function repeatCount (value, count) {
  var hasCount = count == 0, ct = count == null ? -1 : count;
  return new RepeatValueIterable(value, ct, hasCount);
};
