import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { sleep } from '../_sleep';
import { wrapWithAbort } from './withabort';

export class DelayEachAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, dueTime: number, signal?: AbortSignal) {
    super();
    this._source = source;
    this._dueTime = dueTime;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      await sleep(this._dueTime, this._signal);
      yield item;
    }
  }
}

export function delayEach<TSource>(
  dueTime: number,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayEachOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DelayEachAsyncIterable<TSource>(source, dueTime, signal);
  };
}
