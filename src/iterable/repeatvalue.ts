import { of } from './of';
import { RepeatIterable } from './operators/repeat';
import { IterableX } from './iterablex';

export function repeatValue<TSource>(value: TSource, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(of(value), count);
}
