import { IterableX } from '../iterablex.js';
import { OperatorFunction } from '../../interfaces.js';

/** @ignore */
export class SkipWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let yielding = false;
    let i = 0;
    for (const element of this._source) {
      if (!yielding && !this._predicate(element, i++)) {
        yielding = true;
      }
      if (yielding) {
        yield element;
      }
    }
  }
}

/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @template T The type of the elements in the source sequence.
 * @template S The result of the predicate that is truthy/falsy.
 * @param {(value: T, index: number) => value is S} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, S>} An iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorFunction<T, S>;
/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean)} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, T>} An iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
/**
 * Bypasses elements in an async-iterale sequence as long as a specified condition is true
 * and then returns the remaining elements.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean)} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, T>} An iterable sequence that contains the elements from the input
 * sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function skipWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new SkipWhileIterable<T>(source, predicate);
  };
}
