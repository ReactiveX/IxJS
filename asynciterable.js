'use strict';

var $asyncIterator$ = require('./symbol').asyncIterator;
var bindCallback = require('./internal/bindcallback');

function AsyncIterable(source) {
  if (typeof source[$asyncIterator$] !== 'function') {
    throw new TypeError('Source must support Symbol.asyncIterator');
  }
  this._source = source;
}

AsyncIterable.prototype[$asyncIterator$] = function () {
  return this._source[$asyncIterator$]();
};

AsyncIterable.prototype.forEachAsync = function (fn, thisArg) {
  var cb = bindCallback(fn, thisArg, 2);
  var i = 0, e = this[$asyncIterator$](), p;
  var recurse = function () {
    p = e.next().then(function (result) {
      if (!result.done) {
        try {
          cb(result.value, i++);
        } catch (e) {
          return Promise.reject(e);
        }
        recurse();
      } else {
        Promise.resolve();
      }
    });
  };

  recurse();

  return p;
};

module.exports = AsyncIterable;
