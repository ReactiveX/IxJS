import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

export class SkipAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    let it = this._source[Symbol.asyncIterator](),
      count = this._count,
      next;
    while (count > 0 && !(next = await it.next()).done) {
      count--;
    }
    if (count <= 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
      }
    }
  }
}

export function skip<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SkipAsyncIterable<TSource>(source, count);
  };
}
