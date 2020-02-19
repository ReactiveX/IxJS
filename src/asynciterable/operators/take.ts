import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class TakeAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    let i = this._count;
    if (i > 0) {
      for await (const item of wrapWithAbort(this._source, this._signal)) {
        yield item;
        if (--i === 0) {
          break;
        }
      }
    }
  }
}

export function take<TSource>(
  count: number,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TakeAsyncIterable<TSource>(source, count, signal);
  };
}
