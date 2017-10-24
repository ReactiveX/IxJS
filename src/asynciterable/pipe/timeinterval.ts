import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { TimeIntervalAsyncIterable, TimeInterval } from '../timeinterval';

export function timeInterval<TSource>(): OperatorAsyncFunction<TSource, TimeInterval<TSource>> {
  return function timeIntervalOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TimeInterval<TSource>> {
    return new TimeIntervalAsyncIterable<TSource>(source);
  };
}
