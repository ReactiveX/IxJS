import { identity } from '../util/identity';
import { MathOptions } from './mathoptions';

/**
 * Computes the average of the iterable sequence.
 *
 * @param {Iterable<number>} source The source iterable sequence to compute the average.
 * @param {MathOptions<number>} [options] The options for calculating the average.
 * @returns {number} The computed average for the iterable sequence.
 */
export function average(source: Iterable<number>, options?: MathOptions<number>): number;

/**
 * Computes the average of the iterable sequence.
 *
 * @template T The type of elements in the source sequence.
 * @param {Iterable<T>} source The source iterable sequence to compute the average.
 * @param {MathOptions<T>} [options] The options for calculating the average.
 * @returns {number} The computed average for the iterable sequence.
 */
export function average<T>(source: Iterable<T>, options?: MathOptions<T>): number;

/**
 * Computes the average of the iterable sequence.
 *
 * @param {Iterable<any>} source The source iterable sequence to compute the average.
 * @param {MathOptions<any>} [options] The options for calculating the average.
 * @returns {number} The computed average for the iterable sequence.
 */
export function average(source: Iterable<any>, options?: MathOptions<any>): number {
  const { ['selector']: selector = identity, ['thisArg']: thisArg } = options || {};
  let sum = 0;
  let count = 0;
  for (const item of source) {
    sum += selector.call(thisArg, item);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
