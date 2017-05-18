'use strict';

import { AsyncIterableX } from '../asynciterable';

class CatchAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let error = null;

    for (let outer of this._source) {
      error = null;
      let it = outer[Symbol.asyncIterator]();

      while (1) {
        let next = null;
        try {
          next = await it.next();
          if (next.done) { break; }
        } catch (e) {
          error = e;
          break;
        }

        yield next.value;
      }

      if (error !== null) { break; }
    }

    if (error !== null) { throw error; }
  }
}

export function _catchAll<TSource>(source: Iterable<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new CatchAllAsyncIterable<TSource>(source);
}

export function _catch<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _catchAll<T>([source].concat(args));
}

export function _catchStatic<T>(...source: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _catchAll(source);
}