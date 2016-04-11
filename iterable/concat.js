'use strict';

var Iterable = require('../iterable');
var ArrayIterable = require('./arrayiterable');
var fromIterable = require('./from');
var isIterable = require('../internal/isiterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function ConcatIterator(it) {
  Iterator.call(this, it);
  this._innerIt = null;
}

inherits(ConcatIterator, Iterator);

ConcatIterator.prototype.next = function () {
  var outerNext;
  while (1) {
    if (!this._innerIt) {
      outerNext = this._it.next();
      if (outerNext.done) { return { done: true, value: outerNext.value }; }
      
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

function ConcatIterable(source) {
  Iterable.call(this, source);
}

inherits(ConcatIterable, Iterable);

ConcatIterable.prototype[$iterator$] = function () {
  return new ConcatIterator(this._source[$iterator$]());
};

module.exports = function concat() {
  var len = arguments.length, args = new Array(len);
  for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
  !args[$iterator$] && (args = new ArrayIterable(args));
  return new ConcatIterable(args);
};

