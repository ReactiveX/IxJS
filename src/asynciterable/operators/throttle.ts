import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class ThrottleAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _time: number;

  constructor(source: AsyncIterable<TSource>, time: number) {
    super();
    this._source = source;
    this._time = time;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
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

export function throttle<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function throttleOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new ThrottleAsyncIterable<TSource>(source, time);
  };
}
