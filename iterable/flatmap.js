'use strict';

var Iterable = require('../iterable');
var fromIterable = require('./from');
var Iterator = require('../iterator');
var isIterable = require('../internal/isiterable');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function FlatMapIterator(it, fn, resFn) {
  Iterator.call(this, it);
  this._innerIt = null;
  this._fn = fn;
  this._resFn = resFn;
  this._i = 0;
}

inherits(FlatMapIterator, Iterator);

FlatMapIterator.prototype.next = function () {
  var outerNext;
  while(1) {
    if (!this._innerIt) {
      outerNext = this._it.next();
      if (outerNext.done) { return { done: true, value: outerNext.value }; }

      var innerItem = this._fn(outerNext.value, this._i++);
      !isIterable(innerItem) || (innerItem = fromIterable(innerItem));
      this._innerIt = innerItem[$iterator$]();
    }

    var innerNext = this._innerIt.next();
    if (innerNext.done) {
      this._innerIt = null;
    } else {
      var current = innerNext.value;
      this._resFn && (current = this._resFn(outerNext.value, current));
      return { done: false, value: current };
    }
  }
};

function FlatMapIterable(source, fn, resFn) {
  Iterable.call(this, source);
  this._fn = fn;
  this._resFn = resFn;
}

inherits(FlatMapIterable, Iterable);

FlatMapIterable.prototype[$iterator$] = function () {
  return new FlatMapIterator(this._source[$iterator$](), this._fn, this._resFn);
};

module.exports = function flatMap (source, fn, resFn) {
  return new FlatMapIterable(source, fn, resFn);
};
