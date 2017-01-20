'use strict';

var $iterator$ = require('./symbol').iterator;

function Iterator(it) {
  if (it === undefined) {
    return;
  }
  this._it = it;
}

Iterator.prototype[$iterator$] = function () {
  return this;
};

Iterator.prototype.next = function () {
  return this._it.next();
};

module.exports = Iterator;
