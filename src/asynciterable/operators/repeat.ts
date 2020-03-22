import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class RepeatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    if (this._count === -1) {
      while (1) {
        for await (const item of wrapWithAbort(this._source, signal)) {
          yield item;
        }
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        for await (const item of wrapWithAbort(this._source, signal)) {
          yield item;
        }
      }
    }
  }
}

export function repeat<TSource>(count: number = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function repeatOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new RepeatAsyncIterable<TSource>(source, count);
  };
}
