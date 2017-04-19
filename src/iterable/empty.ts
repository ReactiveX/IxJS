'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class EmptyIterator<T> extends IteratorX<T> {
  constructor() {
    super();
  }

  // tslint:disable-next-line:no-empty
  protected *create(): Iterator<T> { }
}

const EMPTY_ITERATOR = new EmptyIterator<any>();

export class EmptyIterable<T> extends IterableX<T> {
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