'use strict';

var $iterator$ = require('./symbol').iterator;

function Iterator() {

}

Iterator.prototype[$iterator$] = function () {
  return this;
};

Iterator.prototype.next = function () {
  throw new Error('must be implemented');
};

module.exports = Iterator;
