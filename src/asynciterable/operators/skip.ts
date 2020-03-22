import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class SkipAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    let count = this._count;
    let next;
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
