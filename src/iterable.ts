'use strict';

import { bindCallback } from './internal/bindcallback';
import { IIterable, IIterator, IIteratorResult } from './iterable.interfaces';

export abstract class Iterable<T> implements IIterable<T> {
  abstract [Symbol.iterator](): IIterator<T>;

  forEach(fn: (value: T, index:number) => void, thisArg?: any): void {
    const it = this[Symbol.iterator](), fun = bindCallback(fn, thisArg, 2);
    let i = 0, next: IIteratorResult<T>;
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }
  }
}