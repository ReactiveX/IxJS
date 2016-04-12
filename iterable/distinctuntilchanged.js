'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var identity = require('../internal/identity');
var inherits = require('inherits');
var isEqual = require('lodash.isequal');

function DistinctUntilChangedIterator(it, fn, cmp) {
  Iterator.call(this, it);
  this._fn = fn;
  this._cmp = cmp;
  this._currentKey = null;
  this._hasCurrentKey = false;
}

inherits(DistinctUntilChangedIterator, Iterator);

DistinctUntilChangedIterator.prototype.next = function () {
  var next = this._it.next();
  if (next.done) { return { done: true, value: next.value }; }
  var key = this._fn(next.value);
  var cmpEquals = false;
  if (this._hasCurrentKey) {
    cmpEquals = this._cmp(this._currentKey, key);
  }
  if (!this._hasCurrentKey || !cmpEquals) {
    this._currentKey = key;
    this._hasCurrentKey = true;
    return { done: false, value: next.value };
  }
};

function DistinctUntilChangedIterable(source, fn, cmp) {
  Iterable.call(this, source);
  this._fn = fn || identity;
  this._cmp = cmp || isEqual;
}

inherits(DistinctUntilChangedIterable, Iterable);

DistinctUntilChangedIterable.prototype[$iterator$] = function () {
  return new DistinctUntilChangedIterator(this._source[$iterator$](), this._fn, this._cmp);
};

module.exports = function distinctUntilChanged(source, fn, cmp) {
  return new DistinctUntilChangedIterable(source, fn, cmp);
}

