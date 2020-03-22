import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class SkipLastAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const q = [] as TSource[];
    for await (const item of wrapWithAbort(this._source, signal)) {
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
