'use strict';

var $iterator$ = require('../symbol').iterable;

module.exports = function isIterable(x) {
  return x != null && Object(x) === x && typeof x[$iterator$] !== 'undefined';
};
