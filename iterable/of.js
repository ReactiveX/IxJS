'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function OfIterator(source) {
  this._source = source;
  this._len = source.length;
  this._index = -1;
  Iterator.call(this);
}

inherits(OfIterator, Iterator);

OfIterator.prototype.next = function () {
  return ++this._index < this._len ?
    { done: false, value: this._source[this._index] } :
    doneIterator;
};

function OfIterable(source) {
  this._source = source;
  Iterable.call(this);
}

inherits(OfIterable, Iterable);

OfIterable.prototype[$iterator$] = function () {
  return new OfIterator(this._start, this._count);
};

module.exports = function of() {
  var len = arguments.length, args = new Array(len);
  for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
  return new OfIterable(args);
};
