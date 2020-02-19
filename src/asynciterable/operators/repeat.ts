import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class RepeatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, count: number, signal?: AbortSignal) {
    super();
    this._source = source;
    this._count = count;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    if (this._count === -1) {
      while (1) {
        for await (const item of wrapWithAbort(this._source, this._signal)) {
          yield item;
        }
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        for await (const item of wrapWithAbort(this._source, this._signal)) {
          yield item;
        }
      }
    }
  }
}

export function repeat<TSource>(
  count: number = -1,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function repeatOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new RepeatAsyncIterable<TSource>(source, count, signal);
  };
}
