import { AsyncIterableX } from '../asynciterable';

class ConcatAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<AsyncIterable<TSource>>;

  constructor(source: AsyncIterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for await (let outer of this._source) {
      for await (let item of outer) { yield item; }
    }
  }
}

class ConcatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for (let outer of this._source) {
      for await (let item of outer) { yield item; }
    }
  }
}

export function concatAll<TSource>(source: AsyncIterable<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new ConcatAllAsyncIterable<TSource>(source);
}

export function _concatAll<TSource>(source: Iterable<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new ConcatAsyncIterable<TSource>(source);
}

export function concat<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new ConcatAsyncIterable<T>([source, ...args]);
}

export function concatStatic<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new ConcatAsyncIterable<T>(args);
}
