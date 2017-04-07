'use strict';

import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

class EmptyIterator<T> extends IteratorImpl<T> {
  constructor() {
    super();
  }

  protected *create(): Iterator<T> { }
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