import { identity } from '../internal/identity';

export function average(source: Iterable<number>, selector?: (x: number) => number): number;
export function average<T>(source: Iterable<T>, selector?: (x: T) => number): number;

/**
 * Computes the average of a sequence of values from the sequence either from the sequence itself
 * or from the selector function.
 * @example
 * // Using non chained version
 * const result = average([1, 2, 3]);
 * const result = Ix.Iterable.of(1, 2, 3).average();
 * console.log(result);
 * @param {Iterable<any>} source A sequence of values to calculate the average of.
 * @param {function(x: any): number} [selector] A transform function to apply to each element.
 * @returns {number} The average of the sequence of values.
 */
export function average(source: Iterable<any>, selector: (x: any) => number = identity): number {
  let sum = 0;
  let count = 0;
  for (let item of source) {
    sum += selector(item);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
