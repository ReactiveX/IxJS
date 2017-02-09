'use strict';

import { IIterable, Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class EmptyIterator extends Iterator {
  constructor() {
    super();
  }

  next() {
    return doneIterator;
  }
}

const EMPTY_ITERATOR = new EmptyIterator();

export class EmptyIterable extends Iterable {
  constructor() {
    super();
  }

  [Symbol.iterator]() {
    return EMPTY_ITERATOR;
  }
}

const EMPTY_ITERABLE = new EmptyIterable();

export function empty(): IIterable {
  return EMPTY_ITERABLE;
}