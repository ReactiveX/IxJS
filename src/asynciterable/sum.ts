import { identityAsync } from '../util/identity.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { MathOptions } from './mathoptions.js';

/**
 * Computes the sum of a sequence of values.
 *
 * @param {AsyncIterable<number>} source A sequence of values to calculate the sum.
 * @param {MathOptions<number>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export async function sum(
  source: AsyncIterable<number>,
  options?: MathOptions<number>
): Promise<number>;
/**
 * Computes the sum of a sequence of values.
 *
 * @template T The type of values in the source sequence.
 * @param {AsyncIterable<T>} source A sequence of values to calculate the sum.
 * @param {MathOptions<T>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export async function sum<T>(source: AsyncIterable<T>, options?: MathOptions<T>): Promise<number>;
/**
 * Computes the sum of a sequence of values.
 *
 * @param {AsyncIterable<any>} source A sequence of values to calculate the sum.
 * @param {MathOptions<any>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export async function sum(source: AsyncIterable<any>, options?: MathOptions<any>): Promise<number> {
  const {
    ['selector']: selector = identityAsync as any,
    ['signal']: signal,
    ['thisArg']: thisArg,
  } = options || {};

  throwIfAborted(signal);

  let value = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    value += await selector.call(thisArg, item, signal);
  }

  return value;
}
