'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function TakeIterator(it, count) {
  this._it = it;
  this._i = count;
  Iterator.call(this);
}

inherits(TakeIterator, Iterator);

TakeerIterator.prototype.next = function () {
  var next = this._it.next();
  if (next.done) { return { done: true, value: next.value }; }
  if (this._i-- === 0) { return { done: true, value: next.value }; ; }
  return { value: next.value, done: false };
};

function TakeIterable(source, count) {
  this._source = source;
  this._count = count;
  Iterable.call(this);
}

inherits(TakeIterable, Iterable);

TakeIterable.prototype[$iterator$] = function () {
  return new TakeIterator(this._source[$iterator$](), this._count);
};

module.exports = function take (source, count) {
  +count || (count = 0);
  Math.abs(count) === Infinity && (count = 0);
  if (count < 0) { throw new RangeError(); }
  return new TakeIterable(source, count);
};
