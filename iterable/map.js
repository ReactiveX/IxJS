'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback');
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function MapIterator(it, fn) {
  this._it = it;
  this._fn = fn;
  this._i = 0;
  Iterator.call(this);
}

inherits(MapIterator, Iterator);

MapIterator.prototype.next = function () {
  var next = this._it.next();
  if (next.done) { return doneIterator; }
  return { done: false, value: this._fn(next, this._i++) };
};

function innerMap(fn, self) {
  return function (x, i) { return fn.call(this, self._fn(x, i), i); };
}

function MapIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  Iterable.call(this);
}

inherits(MapIterable, Iterable);

MapIterable.prototype[$iterator$] = function () {
  return new MapIterator(this._source[$iterator$](), this._fn);
};

MapIterable.prototype.internalMap = function (fn, thisArg) {
  return new MapIterable(this._source, innerMap(fn, this), thisArg);
};

module.exports = function map (source, fn, thisArg) {
  return source instanceof MapIterable ?
    source.internalMap(fn, thisArg) :
    new MapIterable(source, fn, thisArg);
};
