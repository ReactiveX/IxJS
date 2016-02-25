'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var doneIterator = require('../internal/doneIterator');
var noop = require('../internal/noop');
var inherits = require('inherits');

function TapIterator(it, obs) {
  this._it = it;
  this._obs = obs;
  this._i = 0;
  Iterator.call(this);
}

inherits(TapIterator, Iterator);

TapIterator.prototype.next = function () {
  var next;
  try {
    next = this._it.next();
  } catch (e) {
    return this._obs.error(e);
  }
  if (next.done) {
    this._obs.complete();
    return doneIterator;
  }
  this._obs.next(next.value, this._i++);
  return { done: false, value: next.value };
};

function TapIterable(source, obs) {
  this._source = source;
  this._obs = obs;
  Iterable.call(this);
}

inherits(TapIterable, Iterable);

TapIterable.prototype[$iterator$] = function () {
  return new TapIterator(this._source[$iterator$](), this._obs);
};

module.exports = function tap (source, next, error, complete) {
  var obs;
  if (typeof onNext === 'object') {
    obs = {
      next: next.next || noop,
      error: next.error || noop,
      complete: next.complete || noop
    };
  } else {
    obs = {
      next: next || noop,
      error: error || noop,
      complete: complete || noop
    };
  }
  return new TapIterable(source, obs);
};
