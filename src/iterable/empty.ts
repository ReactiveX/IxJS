'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { $iterator$ } from '../symbol';
import { doneIterator } from '../internal/doneiterator';

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

  [$iterator$]() {
    return EMPTY_ITERATOR;
  }
}