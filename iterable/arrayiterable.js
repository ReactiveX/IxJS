'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneiterator');
var inherits = require('inherits');

function ArrayIterator(source) {
  this._source = source;
  this._len = source.length;
  this._index = -1;
  Iterator.call(this);
}

inherits(ArrayIterator, Iterator);

ArrayIterator.prototype.next = function () {
  return ++this._index < this._len ?
    { done: false, value: this._source[this._index] } :
    doneIterator;
};

function ArrayIterable(source) {
  this._source = source;
  Iterable.call(this);
}

inherits(ArrayIterable, Iterable);

ArrayIterable.prototype[$iterator$] = function () {
  return new ArrayIterator(this._source);
};

module.exports = ArrayIterable;