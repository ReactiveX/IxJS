import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class TakeLastAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    if (this._count > 0) {
      const q = [] as TSource[];
      for await (const item of wrapWithAbort(this._source, this._signal)) {
        if (q.length >= this._count) {
          q.shift();
        }
        q.push(item);
      }

      while (q.length > 0) {
        yield q.shift()!;
      }
    }
  }
}

export function takeLast<TSource>(
  count: number,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeLastOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new TakeLastAsyncIterable<TSource>(source, count, signal);
  };
}
