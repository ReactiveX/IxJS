'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneiterator');
var inherits = require('inherits');

function EmptyIterator() {
  Iterator.call(this);  
}

inherits(EmptyIterator, Iterator);

EmptyIterator.prototype.next = function () {
  return doneIterator;
};

var EMPTY_ITERATOR = new EmptyIterator();

function EmptyIterable() {
  Iterable.call(this);
}

inherits(EmptyIterable, Iterable);

EmptyIterable.prototype[$iterator$] = function () {
  return EMPTY_ITERATOR;
};

var EMPTY_ITERABLE = new EmptyIterable();

module.exports = function empty () {
  return EMPTY_ITERABLE;
};
