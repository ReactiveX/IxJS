import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { sleep } from '../_sleep';
import { wrapWithAbort } from './withabort';

export class DelayAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    await sleep(this._dueTime, this._signal);
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      yield item;
    }
  }
}

export function delay<TSource>(
  dueTime: number,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new DelayAsyncIterable<TSource>(source, dueTime, signal);
  };
}
