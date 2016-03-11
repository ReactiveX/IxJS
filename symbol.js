'use strict';

function isSymbol (x) {
  return typeof Symbol === 'function' && typeof x === 'symbol';
}

var $iterator$ = isSymbol(global.Symbol.iterator) ?
  global.Symbol.iterator :
  '_es6-shim iterator_';
if (global.Set && typeof new global.Set()['@@iterator'] === 'function') {
  $iterator$ = '@@iterator';
}

var $asyncIterator$ = isSymbol(global.Symbol.asyncIterator) ?
  global.Symbol.asyncIterator :
  '_es6-shim asyncIterator';

module.exports = {
  isSymbol: isSymbol,
  iterator: $iterator$,
  asyncIterator: $asyncIterator$
};
