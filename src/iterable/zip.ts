'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var isFunction = require('../internal/isfunction');
var inherits = require('inherits');

function argumentsToArray() {
  var len = arguments.length, args = new Array(len);
  for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
  return args;
}

function ZipIterator(it, fn) {
  Iterator.call(this, it);
  this._fn = fn;
}

inherits(ZipIterator, Iterator);

ZipIterator.prototype.next = function () {
  var len = this._it.length, results = [];
  for (var i = 0; i < len; i++) {
    var next = this._it[i].next();
    if (next.done) { return next; }
    results.push(next.value);
  }
  return { done: false, value: this._fn.apply(results) };
};

function ZipIterable(source, fn) {
  Iterable.call(this);
  this._source = source;
  this._fn = fn;
}

inherits(ZipIterable, Iterable);

ZipIterable.prototype[$iterator$] = function () {
  var its = this._source.map(function (x) { return x[$iterator$](); });
  return new ZipIterator(its, this._fn);
};

module.exports = function zip () {
  if (arguments.length === 0) { throw new Error('invalid arguments'); }
  var len = arguments.length, args = new Array(len);
  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
  var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
  return new ZipIterable(args, resultSelector);  
};