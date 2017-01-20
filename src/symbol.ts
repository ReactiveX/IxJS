'use strict';

export function isSymbol (x) {
  return typeof Symbol === 'function' && typeof x === 'symbol';
}

let tmpIterator = isSymbol(Symbol.iterator) ?
  Symbol.iterator :
  '_es6-shim iterator_';
if (Set && typeof new Set()['@@iterator'] === 'function') {
  tmpIterator = '@@iterator';
}

export const $iterator$ = tmpIterator;

export const $asyncIterator$ = isSymbol(Symbol['asyncIterator']) ?
  Symbol['asyncIterator'] :
  '@@asyncIterator';