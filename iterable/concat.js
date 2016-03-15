'use strict';

var Iterable = require('../iterable');
var fromIterable = require('./from');
var isIterable = require('../internal/isiterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneiterator');
var inherits = require('inherits');

function ConcatIterator(outerIt) {
  this._outerIt = outerIt;
  this._innerIt = null;
  Iterator.call(this);
}

inherits(ConcatIterator, Iterator);

ConcatIterator.prototype.next = function () {
  var outerNext;
  while (1) {
    if (!this._innerIt) {
      outerNext = this._outerIt.next();
      if (outerNext.done) { return doneIterator; }
      
      var innerItem = outerNext.value;
      !isIterable(innerItem) || (innerItem = fromIterable(innerItem));
      this._innerIt = innerItem[$iterator$]();
    }
    
    var innerNext = this._innerIt.next();
    if (innerNext.done) {
      this._innerIt = null;
    } else {
      return { done: false, value: innerNext.value };
    }
  }
};

function ArgumentIterator(source) {
  this._source = source;
  this._len = source.length;
  this._index = -1;
  Iterator.call(this);
}

inherits(ArgumentIterator, Iterator);

ArgumentIterator.prototype.next = function () {
  return ++this._index < this._len ?
    { done: false, value: this._source[this._index] } :
    doneIterator;
};

function ArgumentIterable(source) {
  this._source = source;
  Iterable.call(this);
}

inherits(ArgumentIterable, Iterable);

ArgumentIterable.prototype[$iterator$] = function () {
  return new ArgumentIterator(this._source);
};

function ConcatIterable(source) {
  this._source = source;
  Iterable.call(this);
}

inherits(ConcatIterable, Iterable);

ConcatIterable.prototype[$iterator$] = function () {
  return new ConcatIterator(this._source[$iterator$]());
};

module.exports = function concat() {
  var len = arguments.length, args = new Array(len);
  for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
  !args[$iterator$] && (args = new ArgumentIterable(args));
  return new ConcatIterable(args);
};

