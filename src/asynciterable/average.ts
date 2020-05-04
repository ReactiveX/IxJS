import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { MathOptions } from './mathoptions';

/**
 * Computes the average of the async-iterable sequence.
 *
 * @export
 * @param {AsyncIterable<number>} source The source async-iterable sequence to compute the average.
 * @param {AverageOptions<number>} [options] The options for calculating the average.
 * @returns {Promise<number>} A Promise which returns the computed average for the async-iterable sequence.
 */
export async function average(
  source: AsyncIterable<number>,
  options?: MathOptions<number>
): Promise<number>;
/**
 * Computes the average of the async-iterable sequence.
 *
 * @export
 * @template TSource The type of elements in the source sequence.
 * @param {AsyncIterable<TSource>} source source async-iterable sequence to compute the average.
 * @param {AverageOptions<TSource>} [options] The options for calculating the average.
 * @returns {Promise<number>} A Promise which returns the computed average for the async-iterable sequence.
 */
export async function average<TSource>(
  source: AsyncIterable<TSource>,
  options?: MathOptions<TSource>
): Promise<number>;
/**
 * Computes the average of the async-iterable sequence.
 *
 * @export
 * @param {AsyncIterable<any>} source source async-iterable sequence to compute the average.
 * @param {AverageOptions<any>} [options] The options for calculating the average.
 * @returns {Promise<number>} A Promise which returns the computed average for the async-iterable sequence.
 */
export async function average(
  source: AsyncIterable<any>,
  options?: MathOptions<any>
): Promise<number> {
  const opts = options || ({} as MathOptions<any>);
  if (!opts.selector) {
    opts.selector = identityAsync;
  }
  const { ['selector']: selector, ['signal']: signal, ['thisArg']: thisArg } = opts;
  throwIfAborted(signal);
  let sum = 0;
  let count = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    sum += await selector!.call(thisArg, item, signal);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
