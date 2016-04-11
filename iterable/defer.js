'use strict';

var Iterable = require('../iterable');
var Iterator = require('../iterator');
var $iterator$ = require('../symbol').iterator;
var inherits = require('inherits');

function DeferIterable(fn) {
  Iterable.call(this);
  this._fn = fn;
}

DeferIterable.prototype[$iterator$] = function () {
  return new Iterator(this._fn());
};

module.exports = function defer (fn) {
  return new DeferIterable(fn);
};