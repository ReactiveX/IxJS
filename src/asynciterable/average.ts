import { identityAsync } from '../util/identity.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { MathOptions } from './mathoptions.js';

/**
 * Computes the average of the async-iterable sequence.
 *
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
 * @param {AsyncIterable<any>} source source async-iterable sequence to compute the average.
 * @param {AverageOptions<any>} [options] The options for calculating the average.
 * @returns {Promise<number>} A Promise which returns the computed average for the async-iterable sequence.
 */
export async function average(
  source: AsyncIterable<any>,
  options?: MathOptions<any>
): Promise<number> {
  const {
    ['selector']: selector = identityAsync as any,
    ['signal']: signal,
    ['thisArg']: thisArg,
  } = options || {};

  throwIfAborted(signal);

  let sum = 0;
  let count = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    sum += await selector.call(thisArg, item, signal);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
