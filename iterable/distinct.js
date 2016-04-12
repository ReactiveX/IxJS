'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var isEqual = require('lodash.isequal');
var inherits = require('inherits');

// TODO: Fix to O(1) solution instead of O(N)
function arrayIndexOf(array, item, comparer) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i]) === 0) { return i; }
  }
  return -1;
}

function DistinctIterator(it, cmp) {
  Iterator.call(this, it);
  this._cmp = cmp;
  this._q = [];
}

inherits(DistinctIterator, Iterator);

DistinctIterator.prototype.next = function () {
  while (1) {
    var next = this._it.next();
    if (next.done) { return { done: false, value: next.value }; }
    if (arrayIndexOf(this._q, next.value, this._cmp) !== -1) {
      this._q.push(next.value);
      return { done: false, value: next.value };
    }
  }
};

function DistinctIterable(source, cmp) {
  Iterable.call(this, source);
  this._cmp = cmp;
}

inherits(DistinctIterable, Iterable);

DistinctIterable.protoype[$iterator$] = function () {
  return new DistinctIterator(this._source[$iterator$](), this._cmp);
};

module.exports = function distinct (source, cmp) {
  cmp || (cmp = isEqual);
  return new DistinctIterable(source, cmp);
};