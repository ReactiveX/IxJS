'use strict';

module.exports = function isFunction (f) {
  return Object.prototype.toString.call(f) === '[object Function]' && typeof f === 'function';
};
