import { equalityComparer } from '../util/comparer';
import { identity } from '../util/identity';
import { ExtremaOptions } from './extremaoptions';

/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TResult>} The maximum element.
 */
export function max<TSource, TResult = TSource>(
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

  let maxValue = selector(next.value);

  while (!(next = it.next()).done) {
    const current = selector(next.value);
    if (comparer(current, maxValue) > 0) {
      maxValue = current;
    }
  }

  return maxValue;
}
