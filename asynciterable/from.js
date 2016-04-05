'use strict';

var AsyncIterable = require('../asynciterable');
var AsyncIterator = require('../asynciterator');
var $asyncIterator$ = require('../symbol').asyncIterator;
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback');
var isIterable = require('../internal/isiterable');
var toLength = require('../internal/tolength');
var inherits = require('inherits');

function AsyncFromIterator(source, fn) {
  AsyncIterator.call(this);
  var iterable = isIterable(source);
  this._source = source;
  this._isIterable = iterable;
  this._it = iterable ? source[$iterator$]() : null;
  this._fn = fn;
  this._i = 0;
}

inherits(AsyncFromIterator, AsyncIterator);

AsyncFromIterator.prototype._next = function () {
  var value;
  if (this._isIterable) {
    var next = this._it.next();
    if (next.done) {
      return this._settle('return', undefined);
    }
    value = next.value;
    if (this._fn) {
      value = this._fn(value, this._i++);
    }
  } else {
    var length = toLength(this._source.length);
    if (this._i >= length) {
      return this._settle('return', undefined);
    }
    value = this._source[this._i];
    if (this._fn) {
      value = this._fn(value, this._i);
    }
    this._i++;
  }
  this._settle('normal', value);
};

function AsyncFromIterable(source, fn, thisArg) {
  AsyncIterable.call(this);
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
}

inherits(AsyncFromIterable, AsyncIterable);

AsyncFromIterable.prototype[$asyncIterator$] = function () {
  return new AsyncFromIterator(this._source, this._fn);
};

module.exports = function from (source, fn, thisArg) {
  return new AsyncFromIterable(source, fn, thisArg);
};
