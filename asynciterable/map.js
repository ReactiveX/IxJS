'use strict';

var AsyncIterable = require('../iterable');
var AsyncIterator = require('../iterator');
var $asyncIterator$ = require('../symbol').iterator;
var bindCallback = require('../internal/bindcallback');
var doneIterator = require('../internal/doneIterator');
var inherits = require('inherits');

function AsyncMapIterator(it, fn) {
  this._it = it;
  this._fn = fn;
  this._i = 0;
  AsyncIterator.call(this);
}

inherits(AsyncMapIterator, AsyncIterator);

AsyncMapIterator.prototype.next = function () {
  return Promise.resolve(doneIterator);
};


function AsyncMapIterable(source, fn, thisArg) {
  this._source = source;
  this._fn = bindCallback(fn, thisArg, 2);
  AsyncIterable.call(this);
}

inherits(AsyncMapIterable, AsyncIterable);

AsyncMapIterable.prototype[$asyncIterator$] = function () {
  return new AsyncMapIterator(this._source[$asyncIterator$](), this._fn);
};

module.exports = function map (source, fn, thisArg) {
  return new AsyncMapIterable(source, fn, thisArg);
};
