'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback');
var isIterable = require('../internal/isiterable');
var toLength = require('../internal/tolength');
var inherits = require('inherits');

function FromIterator(source, fn) {
  var iterable = isIterable(source);
  this._source = source;
  this._isIterable = iterable;
  this._it = iterable ? source[$iterator$]() : null;
  this._fn = fn;
  this._i = 0;
  Iterator.call(this);
}

inherits(FromIterator, Iterator);

FromIterator.prototype.next = function () {
  var value;
  if (this._isIterable) {
    var next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
    value = next.value;
    if (this._fn) {
      value = this._fn(value, this._i++);
    }
    return { done: false, value: value };
  } else {
    var length = toLength(this._source.length);
    if (this._i < length) {
      value = this._source[this._i];
      if (this._fn) {
        value = this._fn(value, this._i);
      }
      this._i++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
};

function FromIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  Iterable.call(this);
}

inherits(FromIterable, Iterable);

FromIterable.prototype[$iterator$] = function () {
  return new FromIterator(this._source, this._fn);
};

module.exports = function from (source, fn, thisArg) {
  return new FromIterable(source, fn, thisArg);
};
