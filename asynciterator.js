'use strict';

var $asyncIterator$ = require('./symbol').asyncIterator;

function AsyncIterator() {

}

AsyncIterator.prototype[$asyncIterator$] = function () {
  return this;
};

AsyncIterator.prototype.next = function () {
  throw new Error('must be implemented');
};

module.exports = AsyncIterator;
