'use strict';

function reduceFn(source, func, seed) {
  let accumulate = seed, iterator = source[Symbol.iterator](), i = 0;
  while (1) {
    let next = iterator.next();
    if (next.done) { return accumulate; }
    accumulate = func(accumulate, next.value, i++);
  }
}

function reduceFn1(source, func) {
  var iterator = source[Symbol.iterator](), i = 0, next = iterator.next();
  if (next.done) {
    throw new TypeError('Sequence contains no elements');
  }
  var accumulate = next.value;

  while (1) {
    next = iterator.next();
    if (next.done) { return accumulate; }
    accumulate = func(accumulate, next.value, i++);
  }
}

export function reduce<T, R>(...args/* source, fn, seed */): R {
  let source = args[0], fn = args[1];
  if (args.length === 3) {
    return reduceFn(source, fn, args[2]);    
  } else if (args.length === 2) {
    return reduceFn1(source, fn);
  } else {
    throw new Error('Invalid arguments');
  }
}