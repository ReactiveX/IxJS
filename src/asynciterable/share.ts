'use strict';

import { create } from './create';

class SharedAsyncIterable<T> implements AsyncIterable<T> {
  private _it: AsyncIterator<T>;

  constructor(it: AsyncIterator<T>) {
    this._it = it;
  }

  [Symbol.asyncIterator]() {
    return this._it;
  }
}

export function share<TSource>(
    source: AsyncIterable<TSource>): AsyncIterable<TSource>;
export function share<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterable<TResult>
export function share<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterable<TSource | TResult> {
  return fn ?
    create(() => fn(new SharedAsyncIterable(source[Symbol.asyncIterator]()))[Symbol.asyncIterator]()) :
    new SharedAsyncIterable(source[Symbol.asyncIterator]());
}