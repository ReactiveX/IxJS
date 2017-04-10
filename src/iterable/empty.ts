'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

const doneIterator = { done: true, value: undefined };

class EmptyIterator<T> extends IteratorImpl<T> {
  constructor() {
    super();
  }

  _next() {
    return doneIterator;
  }
}

const EMPTY_ITERATOR = new EmptyIterator<any>();

export class EmptyIterable<T> extends IterableImpl<T> {
  constructor() {
    super();
  }

  [Symbol.iterator]() {
    return EMPTY_ITERATOR;
  }
}

const EMPTY_ITERABLE = new EmptyIterable();

export function empty<T>(): Iterable<T> {
  return EMPTY_ITERABLE;
}