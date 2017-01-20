'use strict';

var toInteger = require('./tointeger');
var maxSafeInteger = Math.pow(2, 53) -1;

module.exports = function toLength (value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
};
