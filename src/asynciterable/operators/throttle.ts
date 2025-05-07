import { AsyncIterableX } from '../asynciterablex.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
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

    let last = -Infinity;

    for await (const item of wrapWithAbort(this._source, signal)) {
      const now = Date.now();

      if (now - last > this._time) {
        last = now;
        yield item;
      }
    }
  }
}

/**
 * Throttles the source async-iterable sequence so that it doesn't emit more than one value during the given timeframe.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {number} time The time in milliseconds to throttle the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The source sequence throttled by the given timeframe.
 */
export function throttle<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function throttleOperatorFunction(source) {
    return new ThrottleAsyncIterable(source, time);
  };
}
