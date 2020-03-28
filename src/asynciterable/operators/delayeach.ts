import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { sleep } from '../_sleep';
import { wrapWithAbort } from './withabort';

export class DelayEachAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    for await (const item of wrapWithAbort(this._source, signal)) {
      await sleep(this._dueTime, signal);
      yield item;
    }
  }
}

export function delayEach<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayEachOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DelayEachAsyncIterable<TSource>(source, dueTime);
  };
}
