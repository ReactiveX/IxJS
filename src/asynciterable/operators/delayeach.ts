import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { sleep } from '../_sleep';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class DelayEachAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _dueTime: number;

  constructor(source: AsyncIterable<TSource>, dueTime: number) {
    super();
    this._source = source;
    this._dueTime = dueTime;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for await (const item of wrapWithAbort(this._source, signal)) {
      await sleep(this._dueTime, signal);
      yield item;
    }
  }
}

/**
 * Delays the emitting of each items in the async-iterable by the given due time.
 *
 * @export
 * @template TSource The type of elements in the source sequence.
 * @param {number} dueTime The delay duration in milliseconds
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator which takes an async-iterable and delays each item in the sequence by the given time.
 */
export function delayEach<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayEachOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DelayEachAsyncIterable<TSource>(source, dueTime);
  };
}
