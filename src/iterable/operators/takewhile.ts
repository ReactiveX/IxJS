import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

export class TakeWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._source) {
      if (!this._predicate(item, i++)) {
        break;
      }
      yield item;
    }
  }
}

/**
 * Returns elements from an iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @template S The result of the predicate that is truthy/falsy.
 * @param {(value: T, index: number) => value is S} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, S>} An iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorFunction<T, S>;
/**
 * Returns elements from an iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean)} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, T>} An iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
/**
 * Returns elements from an iterable sequence as long as a specified condition is true.
 *
 * @template T The type of the elements in the source sequence.
 * @param {((value: T, index: number) => boolean)} predicate A function to test each element for a condition.
 * @returns {OperatorFunction<T, T>} An iterable sequence that contains the elements from the input sequence that occur
 * before the element at which the test no longer passes.
 */
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function takeWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new TakeWhileIterable<T>(source, predicate);
  };
}
