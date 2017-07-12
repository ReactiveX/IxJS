import { AsyncIterableX } from '../asynciterable';

class DefaultIfEmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _defaultValue: TSource;

  constructor(source: AsyncIterable<TSource>, defaultValue: TSource) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  async *[Symbol.asyncIterator]() {
    let state = 1;
    for await (let item of this._source) {
      state = 2;
      yield item;
    }
    if (state === 1) {
      yield this._defaultValue;
    }
  }
}

export function defaultIfEmpty<T>(source: AsyncIterable<T>, defaultValue: T): AsyncIterableX<T> {
  return new DefaultIfEmptyAsyncIterable<T>(source, defaultValue);
}
