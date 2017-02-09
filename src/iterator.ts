'use strict';

export interface IIteratorResult {
  value: any;
  done: boolean;
}

export interface IIterator {
  [Symbol.iterator]();
  next(): IIteratorResult;
}

export abstract class Iterator {
  [Symbol.iterator]() {
    return this;
  }

  abstract next(): IIteratorResult;
}
