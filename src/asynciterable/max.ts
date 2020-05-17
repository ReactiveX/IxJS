import { equalityComparerAsync } from '../util/comparer';
import { identityAsync } from '../util/identity';
import { ExtremaOptions } from './extremaoptions';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TResult>} The maximum element.
 */
export async function max<TSource, TResult = TSource>(
  source: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): Promise<TResult> {
  const opts = options || ({} as ExtremaOptions<TSource, TResult>);
  if (!opts.comparer) {
    opts.comparer = equalityComparerAsync;
  }
  if (!opts.selector) {
    opts.selector = identityAsync;
  }

  const { ['comparer']: comparer, ['signal']: signal, ['selector']: selector } = opts;

  throwIfAborted(signal);

  const it = wrapWithAbort(source, signal)[Symbol.asyncIterator]();
  let next = await it.next();

  if (next.done) {
    throw new Error('Sequence contains no elements');
  }

  let maxValue = await selector(next.value);

  while (!(next = await it.next()).done) {
    const current = await selector(next.value);
    if ((await comparer(current, maxValue)) > 0) {
      maxValue = current;
    }
  }

  return maxValue;
}
