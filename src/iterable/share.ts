'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { create } from './create';

class SharedIterable<T> extends Iterable<T> {
  private _it: IIterator<T>;

  constructor(it: IIterator<T>) {
    super();
    this._it = it;
  }

  [Symbol.iterator]() {
    return this._it;
  }
}

export function share<TSource, TResult>(
    source: IIterable<TSource>,
    fn?: (value: IIterable<TSource>) => IIterable<TResult>): Iterable<TSource | TResult> {
  return fn ?
    create(() => fn(new SharedIterable(source[Symbol.iterator]()))[Symbol.iterator]()) :
    new SharedIterable(source[Symbol.iterator]());
}