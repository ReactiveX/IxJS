'use strict';

var $asyncIterator$ = require('./symbol').asyncIterator;

function AsyncIterator() {
  this._queue = [];
  this._current = null;
}

AsyncIterator.prototype[$asyncIterator$] = function () {
  return this;
};

AsyncIterator.prototype._enqueue = function (type, value) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self._queue.push({
      type: type,
      value: value,
      resolve: resolve,
      reject: reject
    });
    self._resume();
  });
};

AsyncIterator.prototype.next = function (value) {
  return this._enqueue('next', value);
};

AsyncIterator.prototype._resume = function () {
  if (this._current || this._queue.length === 0) {
    return;
  }
  this._current = this._queue.shift();
  try {
    switch (this._current.type) {
      case 'throw':
        this._throw(this._current.value);
        break;
      case 'return':
        this._return(this._current.value);
        break;
      default:
        this._next(this._current.value);
        break;
    }
  } catch (error) {
    this._settle('throw', error);
  }
};

AsyncIterator.prototype._throw = function (error) {
  this._settle('throw', error);
};

AsyncIterator.prototype._return = function (value) {
  this._settle('return', value);
};

AsyncIterator.prototype._settle = function (type, value) {
  var self = this;
  Promise.resolve(value).then(function (value) {
    var capability = self._current;
    self._current = null;
    switch (type) {
      case 'throw':
        capability.reject(value);
        break;
      case 'return':
        capability.resolve({ done: true, value: value });
        break;
      default:
        capability.resolve({ done: false, value: value });
        break;
    }
    self._resume();
  }, function (error) {
    self._current.reject(error);
    self._current = null;
    self._resume();
  });
};

module.exports = AsyncIterator;
