'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneiterator');
var inherits = require('inherits');

function GenerateIterator(i, condFn, iterFn, resFn) {
  this._i = i;
  this._confFn = condFn;
  this._iterFn = iterFn;
  this._resFn = resFn;
  this._hasRes = false;
  Iterator.call(this);
}

inherits(GenerateIterator, Iterator);

GenerateIterator.prototype.next = function () {
  this._hasRes && (this._i = this._iterFn(this._i));
  if (!this._condFn(this._i)) { return doneIterator; }
  this._hasRes = true;
  return { done: false, value: this._resFn(this._i) };
};

function GenerateIterable(i, condFn, iterFn, resFn) {
  this._i = i;
  this._condFn = condFn;
  this._iterFn = iterFn;
  this._resFn = resFn;
  Iterable.call(this);
}

inherits(GenerateIterable, Iterable);

GenerateIterable.prototype[$iterator$] = function () {
  return new GenerateIterator(this._i, this._condFn, this._iterFn, this._resFn);
};

module.exports = function generate (i, condFn, iterFn, resFn) {
  return new GenerateIterable(i, condFn, iterFn, resFn);
};
