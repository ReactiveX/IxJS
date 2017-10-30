import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TimestampAsyncIterable, Timestamp } from '../timestamp';

export function timestamp<TSource>(): OperatorAsyncFunction<TSource, Timestamp<TSource>> {
  return function timestampOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<Timestamp<TSource>> {
    return new TimestampAsyncIterable<TSource>(source);
  };
}
