import { identity } from '../util/identity';
import { MathOptions } from './mathoptions';

/**
 * Computes the sum of a sequence of values.
 *
 * @param {AsyncIterable<number>} source A sequence of values to calculate the sum.
 * @param {MathOptions<number>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export function sum(source: Iterable<number>, options?: MathOptions<number>): number;
/**
 * Computes the sum of a sequence of values.
 *
 * @template T The type of values in the source sequence.
 * @param {Iterable<T>} source A sequence of values to calculate the sum.
 * @param {MathOptions<T>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export function sum<T>(source: Iterable<T>, options?: MathOptions<T>): number;
/**
 * Computes the sum of a sequence of values.
 *
 * @param {Iterable<any>} source A sequence of values to calculate the sum.
 * @param {MathOptions<any>} [options] Optional options for providing a selector, thisArg and abort signal.
 * @returns {Promise<number>} A promise containing the sum of the sequence of values.
 */
export function sum(source: Iterable<any>, options?: MathOptions<any>): number {
  const { ['selector']: selector = identity, ['thisArg']: thisArg } = options || {};
  let value = 0;
  for (const item of source) {
    value += selector!.call(thisArg, item);
  }

  return value;
}
