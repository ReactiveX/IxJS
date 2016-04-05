'use strict';

var $iterator$ = require('../symbol').iterator;

module.exports = function isIterable(x) {
  return x != null && Object(x) === x && typeof x[$iterator$] !== 'undefined';
};
