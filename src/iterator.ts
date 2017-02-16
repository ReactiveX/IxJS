'use strict';

export abstract class Iterator<T> {
  [Symbol.iterator]() {
    return this;
  }

  abstract next(): IIteratorResult<T>;
}
