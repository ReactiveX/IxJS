import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { sleep } from '../_sleep';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class DelayAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    await sleep(this._dueTime, signal);
    for await (const item of wrapWithAbort(this._source, signal)) {
      yield item;
    }
  }
}

/**
 * Delays the emitting of the first item in the async-iterable by the given due time.
 * @param dueTime The delay duration in milliseconds
 */
export function delay<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new DelayAsyncIterable<TSource>(source, dueTime);
  };
}
