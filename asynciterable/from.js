'use strict';

var AsyncIterable = require('../asynciterable');
var AsyncIterator = require('../asynciterator');
var $asyncIterator$ = require('../symbol').asyncIterator;
var inherits = require('inherits');

function AsyncFromIterator(gen) {
  this._gen = gen;
  this._current = null;
  this._queue = [];
}

inherits(AsyncFromIterator, AsyncIterator);

['next', 'throw', 'return'].forEach(function (method) {
  AsyncFromIterator.prototype[method] = function (value) {
    this._enqueue(method, value);
  };
});

AsyncFromIterator.prototype._enqueue = function (type, value) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.queue.push({
      type: type,
      value: value,
      resolve: resolve,
      reject: reject
    });
    self._next();
  });
};

AsyncFromIterator.prototype._next = function () {
  if (this._current || this._queue.length === 0) { return; }
  this._current = this._queue.shift();
  this._resume(this._current.type, this._current.value);
};

AsyncFromIterator.prototype._settle = function (type, value) {
  var capability = this._current;
  this._current = null;
  switch (type) {
    case 'throw':
      capability.reject(value);
      break;
    case 'return':
      capability.resolve({done: true, value: value });
      break;
    default:
      capability.resolve({done: false, value: value });
      break;
  }

  this._next();
};

AsyncFromIterator.prototype._resume = function (type, value) {
  var self = this;
  try {
    var result = this._gen[type](value);
    if (isIterAwaitResultObject(result)) {
      Promise.resolve(result.value).then(
        function (x) { self._resume('next', x); },
        function (x) { self._resume('throw, x'; )}
      );
    } else {
      this._settle(result.done ? 'return' : 'normal', x);
    }
  } catch (e) {
    this._settle('throw', e);
  }
};

function AsyncFromIterable(gen) {
  this._gen = gen;
  AsyncIterable.call(this);
}

inherits(AsyncFromIterable, AsyncIterable);

AsyncFromIterable.prototype[$asyncIterator$] = function () {
  return new AsyncFromIterator(this._gen);
};

module.exports = function fromGen (gen) {

};
