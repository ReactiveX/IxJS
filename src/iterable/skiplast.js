'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function SkipLastIterator(it, count) {
  Iterator.call(this, it);
  this._q = [];
  this._count = count;
}

inherits(SkipLastIterator, Iterator);

SkipLastIterator.prototype.next = function () {
  while (1) {
    var next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
    this._q.push(next.value);
    if (this._q.length > this._count) {
      return { done: false, value: this._q.shift() };
    }  
  }
};

function SkipLastIterable(source, count) {
  Iterable.call(this, source);
  this._count = count;
}

inherits(SkipLastIterable, Iterable);

SkipLastIterable.prototype[$iterator$] = function () {
  return new SkipLastIterator(this._source[$iterator$](), this._count);
};

module.exports = function skipLast (source, count) {
  return new SkipLastIterable(source, count);
};