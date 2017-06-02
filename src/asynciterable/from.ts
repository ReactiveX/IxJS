'use strict';

import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';
import { identityAsync } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

class FromAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource> | ArrayLike<TSource>;
  private _selector: (value: TSource, index: number) => TResult | Promise<TResult>;

  constructor(
      source: Iterable<TSource> | ArrayLike<TSource>,
      selector: (value: TSource, index: number) => TResult | Promise<TResult>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    const iterable = isIterable(this._source);
    let i = 0;
    if (iterable) {
      for (let item of <Iterable<TSource>>this._source) {
        yield await this._selector(item, i++);
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      while (i < length) {
        let val = (<ArrayLike<TSource>>this._source)[i];
        yield await this._selector(val, i++);
      }
    }
  }
}

export function from<TSource, TResult>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn: (value: TSource, index: number) => TResult | Promise<TResult> = identityAsync,
    thisArg?: any): AsyncIterableX<TResult> {
  return new FromAsyncIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 2));
}