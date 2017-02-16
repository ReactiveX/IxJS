'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

const doneIterator = { done: true, value: undefined };

class EmptyIterator<T> extends Iterator<T> {
  constructor() {
    super();
  }

  next() {
    return doneIterator;
  }
}

const EMPTY_ITERATOR = new EmptyIterator();

export class EmptyIterable<T> extends Iterable<T> {
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