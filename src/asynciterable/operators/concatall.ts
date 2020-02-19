import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';

export class ConcatAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<AsyncIterable<TSource>>;

  constructor(source: AsyncIterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for await (const outer of this._source) {
      for await (const item of outer) {
        yield item;
      }
    }
  }
}

export function concatAll<T>(): OperatorAsyncFunction<AsyncIterable<T>, T> {
  return function concatAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<T>>
  ): AsyncIterableX<T> {
    return new ConcatAllAsyncIterable<T>(source);
  };
}
