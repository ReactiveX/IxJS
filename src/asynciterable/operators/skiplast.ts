import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class SkipLastAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    let q = [] as TSource[];
    for await (let item of this._source) {
      q.push(item);
      if (q.length > this._count) {
        yield q.shift()!;
      }
    }
  }
}

export function skipLast<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipLastOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipLastAsyncIterable<TSource>(source, count);
  };
}
