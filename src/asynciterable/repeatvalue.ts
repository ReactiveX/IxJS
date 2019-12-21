import { of } from './of';
import { RepeatAsyncIterable } from './operators/repeat';
import { AsyncIterableX } from './asynciterablex';

export function repeatValue<TSource>(value: TSource, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatAsyncIterable<TSource>(of(value), count);
}
