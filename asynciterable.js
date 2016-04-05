'use strict';

// https://github.com/facebook/regenerator/blob/f87d654f85c9925c4db3f74806f7615a71297f40/runtime.js#L136
// https://github.com/facebook/regenerator/blob/f87d654f85c9925c4db3f74806f7615a71297f40/test/async.es6.js#L259

var $asyncIterator$ = require('./symbol').asyncIterator;
var bindCallback = require('./internal/bindcallback');

function AsyncIterable(source) {
  if (source && typeof source[$asyncIterator$] !== 'function') {
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

AsyncIterable.addToObject = function (operators) {
  Object.keys(operators).forEach(function (operator) {
    AsyncIterable[operator] = operators[operator];
  });
};

AsyncIterable.addToPrototype = function (operators) {
  Object.keys(operators).forEach(function (operator) {
    AsyncIterable.prototype[operator] = function () {
      var args = [this];
      args.push.apply(args, arguments);
      return operators[operator].apply(null, args);
    };
  });
};

module.exports = AsyncIterable;
