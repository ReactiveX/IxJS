'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function IgnoreElementsIterator(it) {
  Iterator.call(this, it);
}

inherits(IgnoreElementsIterator, Iterator);

IgnoreElementsIterator.prototype.next = function () {
  while (1) {
    var next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
  }
};

function IgnoreElementsIterable(source) {
  Iterable.call(this, source);
}

inherits(IgnoreElementsIterable, Iterable);

IgnoreElementsIterable.prototype[$iterator$] = function () {
  return new IgnoreElementsIterator(this._source[$iterator$]());
};

module.exports = function ignoreElements(source) {
  return new IgnoreElementsIterable(source);
};