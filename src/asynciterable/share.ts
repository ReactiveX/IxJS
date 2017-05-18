'use strict';

import { AsyncIterableX } from '../asynciterable';
import { create } from './create';

class SharedAsyncIterable<T> extends AsyncIterableX<T> {
  private _it: AsyncIterator<T>;

  constructor(it: AsyncIterator<T>) {
    super();
    this._it = it;
  }

  [Symbol.asyncIterator]() {
    return this._it;
  }
}

export function share<TSource>(
    source: AsyncIterable<TSource>): AsyncIterableX<TSource>;
export function share<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult>;
export function share<TSource, TResult = TSource>(
    source: AsyncIterable<TSource>,
    fn?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  return fn ?
    create<TResult>(() => fn(new SharedAsyncIterable(source[Symbol.asyncIterator]()))[Symbol.asyncIterator]()) :
    new SharedAsyncIterable<TSource>(source[Symbol.asyncIterator]());
}