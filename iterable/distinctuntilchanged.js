'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');
var isEqual = require('lodash/isequal');

function identity (x) { return x; }

function DistinctUntilChangedIterator(it, fn, cmp) {
  Iterator.call(this);
  this._it = it;
  this._fn = fn;
  this._cmp = cmp;
  this._currentKey = null;
  this._hasCurrentKey = false;
}

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

