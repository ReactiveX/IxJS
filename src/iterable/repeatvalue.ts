import { IterableX } from '.';
import { RepeatIterable } from './operators/repeat';

export function repeatValue<TSource>(value: TSource, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(IterableX.of(value), count);
}
