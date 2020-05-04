import { of } from './of';
import { RepeatIterable } from './operators/repeat';
import { IterableX } from './iterablex';

/**
 * Repeats a given value for the specified number of times as an iterable.
 *
 * @export
 * @template TSource The type of element to repeat.
 * @param {TSource} value The value to repeat as an iterable.
 * @param {number} [count=-1] The number of times to repeat the value, infinite if not specified.
 * @returns {AsyncIterableX<TSource>} An iterable with a single item that is repeated over the specified times.
 */
export function repeatValue<TSource>(value: TSource, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(of(value), count);
}
