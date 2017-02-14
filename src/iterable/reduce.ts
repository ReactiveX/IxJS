'use strict';

import { IIterable } from '../iterable';

function reduceFn(source: IIterable, func: (acc: any, x: any, index: number) => any, seed: any): any {
  let accumulate = seed, iterator = source[Symbol.iterator](), i = 0;
  while (1) {
    let next = iterator.next();
    if (next.done) { return accumulate; }
    accumulate = func(accumulate, next.value, i++);
  }
}

function reduceFn1(source: IIterable, func: (acc: any, x: any, index: number) => any): any {
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

export function reduce(source: IIterable, fn: (acc: any, x: any, index: number) => any, seed?:any): any {
  if (arguments.length === 3) {
    return reduceFn(source, fn, arguments[2]);    
  } else if (arguments.length === 2) {
    return reduceFn1(source, fn);
  } else {
    throw new Error('Invalid arguments');
  }
}