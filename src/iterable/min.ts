import { equalityComparer } from '../util/comparer';
import { identity } from '../util/identity';
import { ExtremaOptions } from './extremaoptions';

/**
 *  * Returns the minimum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {Iterable<TSource>} source An iterable sequence to determine the minimum element of.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer.
 * @returns {TResult} The minimum element.
 */
export function min<TSource, TResult = TSource>(
  source: Iterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): TResult {
  const opts = options || ({} as ExtremaOptions<TSource, TResult>);
  if (!opts.comparer) {
    opts.comparer = equalityComparer;
  }
  if (!opts.selector) {
    opts.selector = identity;
  }

  const { ['comparer']: comparer, ['selector']: selector } = opts;

  const it = source[Symbol.iterator]();
  let next = it.next();

  if (next.done) {
    throw new Error('Sequence contains no elements');
  }

  let minValue = selector(next.value);

  while (!(next = it.next()).done) {
    const current = selector(next.value);
    if (comparer(current, minValue) < 0) {
      minValue = current;
    }
  }

  return minValue;
}
