'use strict';

import { IIteratorResult } from './iterable.interfaces';

export abstract class Iterator<T> {
  [Symbol.iterator]() {
    return this;
  }

  abstract next(): IIteratorResult<T>;
}
