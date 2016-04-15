'use strict';

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

AsyncIterable.prototype.forEachAsync = function (fn) {
  var self = this;
  return new Promise(function (resolve) {
    var iter = self[$asyncIterator$]();
    var i = 0;
    function next() {
      return iter.next().then(function (result) {
        if (result.done) {
          return result.value;
        }
        fn(result.value, i++);
        return next();
      })
    }
    resolve(next());
  });
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
