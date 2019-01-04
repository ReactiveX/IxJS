import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

export class ReverseAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let results = [] as TSource[];
    for await (let item of this._source) {
      results.unshift(item);
    }
    yield* results;
  }
}

export function reverse<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function reverseOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ReverseAsyncIterable<TSource>(source);
  };
}
