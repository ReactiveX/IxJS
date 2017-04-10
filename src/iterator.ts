'use strict';

export interface IteratorImplResult<T> {
  value?: T;
  done: boolean;
}

export abstract class IteratorImpl<T> implements Iterator<T> {
  [Symbol.iterator]() {
    // Force it to be a true iterator
    return this;
  }

  // Jump through a hook here :(
  protected abstract _next(): IteratorImplResult<T>;

  next() {
    return <IteratorResult<T>><any>this._next();
  }
}
