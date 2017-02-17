'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

class IgnoreElementsIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;

  constructor(it: IIterator<T>) {
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

class IgnoreElementsIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;

  constructor(source: IIterable<T>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new IgnoreElementsIterator(this._source[Symbol.iterator]());
  }
}

export function ignoreElements<T>(source: IIterable<T>): Iterable<T> {
  return new IgnoreElementsIterable(source);
};