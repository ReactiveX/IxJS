'use strict';

import { IIterable, Iterable } from '../iterable';
import { IIterator, Iterator } from '../iterator';

class IgnoreElementsIterator extends Iterator {
  private _it: IIterator;

  constructor(it: IIterator) {
    super();
    this._it = it;
  }

  next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { return { done: true, value: undefined }; }
    }    
  }
}

class IgnoreElementsIterable extends Iterable {
  private _source: IIterable;

  constructor(source: IIterable) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new IgnoreElementsIterator(this._source[Symbol.iterator]());
  }
}

export function ignoreElements(source: IIterable): IIterable {
  return new IgnoreElementsIterable(source);
};