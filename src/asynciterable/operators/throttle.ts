import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class ThrottleAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _time: number;

  constructor(source: AsyncIterable<TSource>, time: number) {
    super();
    this._source = source;
    this._time = time;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let currentTime;
    let previousTime;
    for await (const item of wrapWithAbort(this._source, signal)) {
      currentTime = Date.now();
      if (!previousTime || currentTime - previousTime > this._time) {
        previousTime = currentTime;
        yield item;
      }
    }
  }
}

/**
 * Throttles the source async-iterable sequence so that it doesn't emit more than one value during the given timeframe.
 *
 * @export
 * @template TSource The type of elements in the source sequence.
 * @param {number} time The time in milliseconds to throttle the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence throttled by the given timeframe.
 */
export function throttle<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function throttleOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new ThrottleAsyncIterable<TSource>(source, time);
  };
}
