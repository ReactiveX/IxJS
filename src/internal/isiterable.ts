'use strict';

export function isIterable(x) {
  return x != null && Object(x) === x && typeof x[Symbol.iterator] !== 'undefined';
}