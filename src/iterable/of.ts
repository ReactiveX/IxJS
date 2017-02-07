'use strict';

var ArrayIterable = require('./arrayiterable');

module.exports = function of() {
  var len = arguments.length, args = new Array(len);
  for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
  return new ArrayIterable(args);
};