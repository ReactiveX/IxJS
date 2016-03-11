'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function TakeLastIterator(it, count) {
  this._it = it;
  this._count = count;
  this._q = [];
  Iterator.call(this);
}

inherits(TakeLastIterator, Iterator);

TakeLastIterator.prototype.next = function () {
  var next;
  while (!(next = this._it.next()).done) {
    if (this._q.length >= this._count) { this._q.shift(); }
    this._q.push(next.value);
  }
  if (this._q.length > 0) {
    return { done: false, value: this._q.shift() };
  } else {
    return doneIterator;
  }
};

function TakeLastIterable(source, count) {
  this._source = source;
  this._count = count;
  Iterable.call(this);
}

TakeLastIterable.prototype[$iterator$] = function () {
  return new TakeLastIterator(this._source[$iterator$](), this._count);
};

module.exports = function takeLast(source, count) {
  return new TakeLastIterable(source, count);
};
